import type { Dictionary } from './es';

export const en: Dictionary = {
  meta: {
    title: 'SHE - YIS BRIGHTCORE LLC · Connected technology. Innovation without limits.',
    description:
      'SHE - YIS BRIGHTCORE LLC builds platforms and apps that connect medical students with knowledge: Neuremy to learn and TopoQuizz to practice.',
  },
  a11y: {
    skip: 'Skip to content',
    homeLabel: 'SHE - YIS BRIGHTCORE LLC, go to home',
    external: '(opens in a new tab)',
    logoAlt: 'SHE - YIS BRIGHTCORE symbol: seven lights connected around an axis',
  },
  nav: {
    label: 'Main',
    products: 'Products',
    ecosystem: 'Ecosystem',
    capabilities: 'Capabilities',
    about: 'About',
    cta: "Let's talk",
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    langCode: 'ES',
    langName: 'Español',
    langLabel: 'Cambiar a español',
  },
  rail: {
    label: 'Page progress',
    sections: ['Home', 'Neuremy', 'TopoQuizz', 'Ecosystem', 'Capabilities', 'About', 'Contact'],
  },
  hero: {
    eyebrow: 'Technology applied to medical education',
    line1: 'Connected technology.',
    line2: 'Innovation without limits.',
    lead: 'We build platforms and apps that connect medical students with the knowledge they need: Neuremy to learn, TopoQuizz to practice.',
    ctaProducts: 'Explore our products',
    ctaContact: "Let's talk",
    productsLabel: 'Our products',
    scroll: 'Follow the axis',
  },
  neuremy: {
    tag: 'Study platform',
    title: 'Everything you need to study medicine.',
    modulesTitle: 'Six modules, one platform',
    imageAlt:
      'Neuremy on a laptop: a clinical pharmacokinetics video class with the lesson contents list and the instructor.',
  },
  topoquizz: {
    tag: 'Mobile app',
    title: 'Practice medicine by playing.',
    specsLabel: 'TopoQuizz at a glance',
    imageAlts: {
      home: 'TopoQuizz home screen showing the Pharmacology and Anatomy subjects.',
      quiz: 'TopoQuizz question with a timer, difficulty level and four answer options.',
      progress: 'TopoQuizz progress screen showing the explanation of a question.',
    },
  },
  ecosystem: {
    tag: 'Ecosystem',
    title: 'Learn. Practice. Measure.',
    lead: 'Two products that connect into a single study flow.',
    stepLabel: 'Step',
    steps: [
      {
        id: 'learn',
        verb: 'Learn',
        product: 'Neuremy',
        text: 'Video classes, clinical cases and summaries to understand every topic in depth.',
      },
      {
        id: 'practice',
        verb: 'Practice',
        product: 'TopoQuizz',
        text: 'Timed quizzes with explanations to lock in what you learned.',
      },
      {
        id: 'measure',
        verb: 'Measure',
        product: 'Neuremy · TopoQuizz',
        text: 'Progress and statistics by topic so you know exactly what to reinforce.',
      },
    ],
  },
  capabilities: {
    tag: 'Capabilities',
    title: 'Custom software, with applied artificial intelligence.',
    lead: 'We design and build digital tools that respond to real needs of everyday life and commerce.',
    items: [
      {
        id: 'custom',
        icon: 'code',
        title: 'Custom software',
        text: 'Technology solutions designed for each need, from idea to a product in production.',
      },
      {
        id: 'apps',
        icon: 'mobile',
        title: 'Web and mobile apps',
        text: 'Platforms and applications ready to use from any device.',
      },
      {
        id: 'subscriptions',
        icon: 'card',
        title: 'Content and subscriptions',
        text: 'Platforms with a content catalog, plans and online payments.',
      },
      {
        id: 'ai',
        icon: 'spark',
        title: 'Applied AI',
        text: 'Artificial intelligence models integrated where they bring real value.',
      },
      {
        id: 'admin',
        icon: 'panel',
        title: 'Admin dashboards',
        text: 'Content, user and metrics management to run every product.',
      },
    ],
  },
  about: {
    tag: 'About',
    title: 'Seven lights, one axis.',
    text: 'SHE - YIS BRIGHTCORE LLC connects people, data and systems from a solid technological axis. Our symbol is a constellation: seven points of light arranged around an axis and joined by short strokes. One of them, taller and brighter, gives rise to the others.',
    tonesLabel: 'How we are',
    tones: [
      { id: 'professional', name: 'Professional', text: 'Technical precision and clear language.' },
      { id: 'innovative', name: 'Innovative', text: 'Solutions that anticipate what comes next.' },
      { id: 'futuristic', name: 'Futuristic', text: 'Modular geometry, neon on dark.' },
    ],
  },
  contact: {
    tag: 'Contact',
    title: "Let's talk.",
    text: 'Tell us what you want to build, or write to learn more about Neuremy and TopoQuizz.',
    ctaMail: 'Write to us',
    ctaProducts: 'See products',
    mailSubject: 'Hello, SHE - YIS BRIGHTCORE',
  },
  footer: {
    tagline: 'Connected technology. Innovation without limits.',
    productsTitle: 'Products',
    legalTitle: 'Product legal',
    legal: [
      { label: 'Neuremy · Privacy and terms', href: 'https://neuremy.com/legal' },
      { label: 'TopoQuizz · Privacy', href: 'https://topoquizz.com/privacy' },
      { label: 'TopoQuizz · Terms', href: 'https://topoquizz.com/terms' },
    ],
    rights: 'All rights reserved.',
  },
};
