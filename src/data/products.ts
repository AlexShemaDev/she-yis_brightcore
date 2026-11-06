import type { L10n } from '../i18n/types';

/**
 * Single source of product facts. Every claim here comes from the product repos
 * (Neuremy web app, TopoQuizz app and its landing). Items marked VERIFY must be
 * confirmed with the company before publishing.
 */
export type IconName =
  | 'video'
  | 'cards'
  | 'summary'
  | 'case'
  | 'exam'
  | 'progress'
  | 'timer'
  | 'offline'
  | 'shield'
  | 'levels'
  | 'book'
  | 'question';

export interface ProductFeature {
  id: string;
  icon: IconName;
  title: L10n;
  text: L10n;
}

export interface ProductStat {
  id: string;
  /** Numeric value used for the count-up; the formatted value is rendered in HTML. */
  value: number;
  prefix?: string;
  label: L10n;
}

export interface ProductLink {
  kind: 'primary' | 'secondary' | 'tertiary';
  icon?: 'arrow' | 'external' | 'play';
  label: L10n;
  href: string;
}

export interface Product {
  id: 'neuremy' | 'topoquizz';
  name: string;
  tagline: L10n;
  description: L10n;
  status: L10n;
  features: readonly ProductFeature[];
  stats: readonly ProductStat[];
  links: readonly ProductLink[];
  /** Label for a channel that is announced but not yet available (not a link). */
  upcoming?: L10n;
}

export const neuremy: Product = {
  id: 'neuremy',
  name: 'Neuremy',
  tagline: {
    es: 'Plataforma de estudio médico',
    en: 'Medical study platform',
  },
  description: {
    es: 'Plataforma digital de estudio para futuros médicos: lecciones estructuradas por materia, clases en video con especialistas, recursos dinámicos y contenido interactivo para aprender y practicar desde donde estés.',
    en: 'A digital study platform for future doctors: lessons structured by subject, video classes with specialists, dynamic resources and interactive content to learn and practice from wherever you are.',
  },
  status: { es: 'En producción', en: 'In production' },
  features: [
    {
      id: 'video',
      icon: 'video',
      title: { es: 'Video clases', en: 'Video classes' },
      text: {
        es: 'Clases con médicos especialistas, organizadas por materia, lección y sublección.',
        en: 'Classes with specialist physicians, organized by subject, lesson and sub-lesson.',
      },
    },
    {
      id: 'flashcards',
      icon: 'cards',
      title: { es: 'Flashcards', en: 'Flashcards' },
      text: {
        es: 'Tarjetas de repaso activo para fijar los conceptos esenciales.',
        en: 'Active-recall cards to lock in the essential concepts.',
      },
    },
    {
      id: 'summaries',
      icon: 'summary',
      title: { es: 'Resúmenes clínicos', en: 'Clinical summaries' },
      text: {
        es: 'Síntesis claras en PDF, apoyadas en bibliografía confiable.',
        en: 'Clear PDF syntheses backed by reliable bibliography.',
      },
    },
    {
      id: 'cases',
      icon: 'case',
      title: { es: 'Casos clínicos', en: 'Clinical cases' },
      text: {
        es: 'Escenarios reales para razonar como en la práctica.',
        en: 'Real scenarios to reason the way you would in practice.',
      },
    },
    {
      id: 'evaluations',
      icon: 'exam',
      title: { es: 'Evaluaciones', en: 'Evaluations' },
      text: {
        es: 'Cuestionarios con revisión para medir lo que aprendiste.',
        en: 'Quizzes with review to measure what you have learned.',
      },
    },
    {
      id: 'progress',
      icon: 'progress',
      title: { es: 'Progreso 360°', en: '360° progress' },
      text: {
        es: 'Tu avance, tu tiempo de estudio y tu racha en un solo panel.',
        en: 'Your progress, study time and streak in a single dashboard.',
      },
    },
  ],
  stats: [],
  links: [
    {
      kind: 'primary',
      icon: 'external',
      label: { es: 'Ir a Neuremy', en: 'Go to Neuremy' },
      href: 'https://neuremy.com',
    },
    {
      kind: 'secondary',
      icon: 'arrow',
      label: { es: 'Regístrate gratis', en: 'Sign up free' },
      href: 'https://neuremy.com/sign-up',
    },
  ],
};

export const topoquizz: Product = {
  id: 'topoquizz',
  name: 'TopoQuizz',
  tagline: {
    es: 'Practica medicina jugando',
    en: 'Practice medicine by playing',
  },
  description: {
    es: 'La app móvil que complementa tu estudio: quizzes de Anatomía y Farmacología en tres niveles de dificultad, con explicaciones y estadísticas automáticas de tu progreso.',
    en: 'The mobile app that complements your study: Anatomy and Pharmacology quizzes at three difficulty levels, with explanations and automatic progress statistics.',
  },
  status: { es: 'Beta', en: 'Beta' },
  features: [
    {
      id: 'timer',
      icon: 'timer',
      title: { es: 'Modo cronómetro', en: 'Timer mode' },
      text: {
        es: 'Practica con el tiempo corriendo, como en un examen real.',
        en: 'Practice against the clock, like in a real exam.',
      },
    },
    {
      id: 'progress',
      icon: 'progress',
      title: { es: 'Progreso por tema', en: 'Progress by topic' },
      text: {
        es: 'Estadísticas automáticas para saber qué reforzar.',
        en: 'Automatic statistics to know what to reinforce.',
      },
    },
    {
      id: 'offline',
      icon: 'offline',
      title: { es: 'Sin conexión', en: 'Offline' },
      text: {
        es: 'Estudia donde estés, incluso sin internet.',
        en: 'Study anywhere, even without internet.',
      },
    },
    {
      id: 'validated',
      icon: 'shield',
      title: { es: 'Preguntas validadas', en: 'Validated questions' },
      text: {
        es: 'Contenido revisado por especialistas.',
        en: 'Content reviewed by specialists.',
      },
    },
  ],
  stats: [
    // VERIFY: the TopoQuizz landing and launch deck say +2,500; the group site and the
    // Neuremy landing say "more than 2,000".
    {
      id: 'questions',
      value: 2500,
      prefix: '+',
      label: { es: 'Preguntas', en: 'Questions' },
    },
    {
      id: 'levels',
      value: 3,
      label: { es: 'Niveles de dificultad', en: 'Difficulty levels' },
    },
    {
      id: 'subjects',
      value: 2,
      label: { es: 'Materias, y más en camino', en: 'Subjects, with more on the way' },
    },
  ],
  links: [
    {
      kind: 'primary',
      icon: 'play',
      label: { es: 'Disponible en Google Play', en: 'Get it on Google Play' },
      href: 'https://play.google.com/store/apps/details?id=com.topoquizz',
    },
    {
      kind: 'secondary',
      icon: 'external',
      label: { es: 'Conocer TopoQuizz', en: 'Discover TopoQuizz' },
      href: 'https://topoquizz.com',
    },
  ],
  // VERIFY: iOS support is planned (Sprint 6) but not confirmed as released.
  upcoming: { es: 'iOS próximamente', en: 'iOS coming soon' },
};

export const products = { neuremy, topoquizz } as const;
export const productList: readonly Product[] = [neuremy, topoquizz];
