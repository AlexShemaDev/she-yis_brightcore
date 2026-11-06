/**
 * The only place GSAP is used. Sections never import it: they expose hooks
 * (`data-reveal`, `data-draw`, `data-part`, `data-eco`, `data-bus`, `data-count`,
 * `data-parallax`, `data-trace`) and this module animates them.
 *
 * - Runs on every `astro:page-load` (initial load and ClientRouter swaps) and tears
 *   everything down on `astro:before-swap`, so triggers are never duplicated.
 * - `prefers-reduced-motion: reduce` keeps the final state: no drawing, no pin, no
 *   parallax, no counters. Only state tracking (rail, header) remains.
 * - If anything fails, `html.no-motion` reveals all content.
 */
import { formatInteger } from '../i18n/format';
import type { Locale } from '../i18n/types';

type Gsap = (typeof import('gsap'))['gsap'];
type ScrollTriggerStatic = (typeof import('gsap/ScrollTrigger'))['ScrollTrigger'];
type Conditions = Record<string, boolean>;

const root = document.documentElement;
const HEADER_OFFSET = 68;

let revert: (() => void) | undefined;
let generation = 0;

const qs = <T extends Element = HTMLElement>(selector: string, scope: ParentNode = document) =>
  scope.querySelector<T>(selector);
const qsa = <T extends Element = HTMLElement>(selector: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(selector));

function teardown() {
  generation += 1;
  revert?.();
  revert = undefined;
}

async function start() {
  teardown();
  const current = generation;
  if (!qs('[data-landing]')) return;

  try {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]);
    if (current !== generation) return; // navigated away while loading

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        wide: '(min-width: 768px)',
        // The pinned section needs room: below this height its content would not fit.
        tall: '(min-height: 640px)',
        fine: '(hover: hover) and (pointer: fine)',
      },
      (context) => setup(gsap, ScrollTrigger, (context.conditions ?? {}) as Conditions),
    );

    revert = () => mm.revert();
    root.classList.add('motion-ready');

    const refresh = () => ScrollTrigger.refresh();
    void document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
  } catch (error) {
    console.error('[motion] disabled, revealing content:', error);
    root.classList.add('no-motion');
  }
}

function setup(gsap: Gsap, ScrollTrigger: ScrollTriggerStatic, conditions: Conditions) {
  const { reduce, wide, tall, fine } = conditions;
  const cleanups: Array<() => void> = [];

  if (fine) cleanups.push(pointerGlow());
  cleanups.push(headerState());

  if (reduce) {
    // Final state is already visible through CSS; light the static markers.
    qsa('[data-bus-node]').forEach((node) => node.classList.add('is-lit'));
    qs('[data-trace-node]')?.classList.add('is-lit');
    cleanups.push(rail(gsap, ScrollTrigger));
    return () => cleanups.forEach((fn) => fn());
  }

  // 1. Hero: the symbol draws itself, then the shamash pulses (CSS).
  const heroMark = qs<SVGSVGElement>('[data-hero-mark] .mark');
  if (heroMark) introMark(gsap, heroMark, 0.25);

  // 2. Ecosystem: pinned scrollytelling on desktop (created before other triggers
  //    so later trigger positions account for the pin spacing).
  const eco = qs('[data-eco]');
  if (eco && wide && tall) cleanups.push(pinnedEcosystem(gsap, eco));

  // 3. Reveals (skipping the steps that the pinned timeline owns).
  qsa('[data-reveal]').forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
    });
  });

  const items = qsa('[data-reveal-item]').filter((item) => !item.closest('.is-pinned'));
  if (items.length) {
    ScrollTrigger.batch(items, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.09,
          overwrite: true,
        }),
    });
  }

  // 4. Circuit bus (Neuremy modules) and closing trace (contact).
  qsa('[data-bus]').forEach((bus) => {
    gsap.fromTo(
      bus,
      { '--p': 0 },
      {
        '--p': 1,
        ease: 'none',
        scrollTrigger: { trigger: bus, start: 'top 75%', end: 'bottom 70%', scrub: 0.5 },
      },
    );
  });

  qsa('[data-bus-node]').forEach((node) => {
    ScrollTrigger.create({
      trigger: node,
      start: 'top 82%',
      onEnter: () => node.classList.add('is-lit'),
      onLeaveBack: () => node.classList.remove('is-lit'),
    });
  });

  qsa('[data-trace]').forEach((trace) => {
    const node = qs('[data-trace-node]', trace);
    gsap.fromTo(
      trace,
      { '--p': 0 },
      {
        '--p': 1,
        ease: 'none',
        scrollTrigger: {
          trigger: trace,
          start: 'top 92%',
          end: 'bottom 72%',
          scrub: 0.4,
          onUpdate: (self) => node?.classList.toggle('is-lit', self.progress > 0.98),
        },
      },
    );
  });

  // 5. Counters (the final value is already in the HTML).
  qsa('[data-count]').forEach((element) => cleanups.push(counter(gsap, ScrollTrigger, element)));

  // 6. Parallax for the device stage (desktop only).
  if (wide) {
    qsa('[data-parallax]').forEach((element) => {
      const distance = Number(element.dataset.parallax) || 0;
      gsap.to(element, {
        y: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: element.closest('section') ?? element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  // 7. Rail last, once every pin has been measured.
  cleanups.push(rail(gsap, ScrollTrigger));

  return () => cleanups.forEach((fn) => fn());
}

/** Draws the symbol: arms and stem trace, nodes pop, links and shamash light up. */
function introMark(gsap: Gsap, mark: SVGSVGElement, delay: number) {
  const part = (name: string) => qs<SVGGElement>(`[data-part="${name}"]`, mark);
  const draws = qsa<SVGPathElement>('[data-draw]', mark);
  const joints = part('joints');
  const nodes = part('nodes');
  const links = part('links');
  const shamash = part('shamash');
  const halo = part('halo');
  const circles = nodes ? qsa<SVGCircleElement>('circle', nodes) : [];

  gsap.set([...circles, shamash], { transformBox: 'fill-box', transformOrigin: '50% 50%' });

  const tl = gsap.timeline({ delay });
  tl.fromTo(draws, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', stagger: 0.07 }, 0)
    .to(joints, { opacity: 1, duration: 0.3 }, 0.55)
    .to(nodes, { opacity: 1, duration: 0.2 }, 0.7)
    .fromTo(circles, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.05 }, 0.7)
    .to(links, { opacity: 1, duration: 0.5 }, 0.9)
    .to(halo, { opacity: 1, duration: 0.6 }, 1.1)
    .fromTo(shamash, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, 1.1);
}

/**
 * Pinned scrollytelling: three steps cross-fade while the symbol is assembled
 * (arms/stem → nodes/links → shamash). Returns a cleanup that restores the markup.
 */
function pinnedEcosystem(gsap: Gsap, eco: HTMLElement) {
  const mark = qs<SVGSVGElement>('.mark', eco);
  const steps = qsa('[data-eco-step]', eco);
  const dots = qsa('[data-eco-dot]', eco);
  if (!mark || steps.length < 3) return () => {};

  eco.classList.add('is-pinned');
  mark.classList.add('mark--intro');

  const part = (name: string) => qs<SVGGElement>(`[data-part="${name}"]`, mark);
  const draws = qsa<SVGPathElement>('[data-draw]', mark);
  const joints = part('joints');
  const nodes = part('nodes');
  const links = part('links');
  const shamash = part('shamash');
  const halo = part('halo');
  const circles = nodes ? qsa<SVGCircleElement>('circle', nodes) : [];

  gsap.set([...circles, shamash], { transformBox: 'fill-box', transformOrigin: '50% 50%' });
  gsap.set(draws, { strokeDashoffset: 1 });
  gsap.set([joints, nodes, links, shamash, halo], { opacity: 0 });
  gsap.set(steps, { autoAlpha: 0, y: 32 });
  gsap.set(steps[0] ?? [], { autoAlpha: 1, y: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: eco,
      start: `top top+=${HEADER_OFFSET}`,
      end: '+=240%',
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  const swap = (from: number, to: number, at: number) => {
    tl.to(steps[from] ?? [], { autoAlpha: 0, y: -32, duration: 0.3 }, at).fromTo(
      steps[to] ?? [],
      { autoAlpha: 0, y: 32 },
      { autoAlpha: 1, y: 0, duration: 0.3 },
      at + 0.15,
    );
  };
  const lightDot = (index: number, at: number) =>
    tl.to(dots[index] ?? [], { backgroundColor: '#00bfff', duration: 0.2 }, at);

  // Step 1 — Aprende: stem and arms are drawn, joints light up.
  lightDot(0, 0);
  tl.to(draws, { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut', stagger: 0.06 }, 0)
    .to(joints, { opacity: 1, duration: 0.3 }, 0.6);

  // Step 2 — Practica: nodes pop in, links connect them.
  swap(0, 1, 1.0);
  lightDot(1, 1.1);
  tl.to(nodes, { opacity: 1, duration: 0.1 }, 1.1)
    .fromTo(circles, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.04 }, 1.1)
    .to(links, { opacity: 1, duration: 0.4 }, 1.45);

  // Step 3 — Mide: the shamash ignites.
  swap(1, 2, 2.0);
  lightDot(2, 2.1);
  tl.to(halo, { opacity: 1, duration: 0.3 }, 2.15).fromTo(
    shamash,
    { opacity: 0, scale: 0.4 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
    2.15,
  );

  tl.to({}, { duration: 0.4 }); // hold the finished symbol before releasing the pin

  return () => {
    eco.classList.remove('is-pinned');
    mark.classList.remove('mark--intro');
  };
}

/** Counts up from 0 once; restores the final text on cleanup. */
function counter(gsap: Gsap, ScrollTrigger: ScrollTriggerStatic, element: HTMLElement) {
  const target = Number(element.dataset.count);
  const prefix = element.dataset.prefix ?? '';
  const locale: Locale = element.dataset.locale === 'en' ? 'en' : 'es';
  const format = (value: number) => prefix + formatInteger(Math.round(value), locale);

  if (!Number.isFinite(target)) return () => {};

  const state = { value: 0 };
  element.textContent = format(0);

  ScrollTrigger.create({
    trigger: element,
    start: 'top 88%',
    once: true,
    onEnter: () =>
      gsap.to(state, {
        value: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = format(state.value);
        },
        onComplete: () => {
          element.textContent = format(target);
        },
      }),
  });

  return () => {
    element.textContent = format(target);
  };
}

/** Fills the rail trace with page progress and marks the active / passed nodes. */
function rail(gsap: Gsap, ScrollTrigger: ScrollTriggerStatic) {
  const fill = qs('[data-rail-fill]');
  const nodes = qsa('[data-rail-node]');
  const sections = qsa('[data-section]');
  if (!fill || nodes.length === 0 || sections.length === 0) return () => {};

  const last = Math.max(1, nodes.length - 1);
  const setState = (active: number) =>
    nodes.forEach((node, i) => {
      node.dataset.state = i < active ? 'passed' : i === active ? 'active' : 'idle';
    });
  const setFill = (ratio: number) =>
    fill.style.setProperty('--p', String(Math.min(1, Math.max(0, ratio))));

  setState(0);
  setFill(0);

  const triggers = sections.map((section, i) =>
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) setState(i);
      },
      onUpdate: (self) => setFill((i + self.progress) / last),
    }),
  );

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    gsap.set(fill, { clearProps: 'all' });
  };
}

/** Reveals the bright hexagon layer around the pointer (fine pointers only). */
function pointerGlow() {
  const grid = qs('.hexgrid');
  if (!grid) return () => {};

  let frame = 0;
  let x = 0;
  let y = 0;

  const onMove = (event: PointerEvent) => {
    x = event.clientX;
    y = event.clientY;
    root.classList.add('has-pointer');
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      grid.style.setProperty('--mx', `${x}px`);
      grid.style.setProperty('--my', `${y}px`);
    });
  };
  const onLeave = () => root.classList.remove('has-pointer');

  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    root.classList.remove('has-pointer');
  };
}

/** Toggles the translucent header once the page scrolls. */
function headerState() {
  const header = qs('[data-header]');
  if (!header) return () => {};

  const update = () => {
    header.dataset.stuck = String(window.scrollY > 8);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });

  return () => window.removeEventListener('scroll', update);
}

document.addEventListener('astro:page-load', () => void start());
document.addEventListener('astro:before-swap', teardown);
