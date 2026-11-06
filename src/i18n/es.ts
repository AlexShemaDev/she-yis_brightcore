export const es = {
  meta: {
    title: 'SHE - YIS BRIGHTCORE LLC · Tecnología conectada. Innovación sin límites.',
    description:
      'SHE - YIS BRIGHTCORE LLC crea plataformas y aplicaciones que conectan a estudiantes de medicina con el conocimiento: Neuremy para aprender y TopoQuizz para practicar.',
  },
  a11y: {
    skip: 'Saltar al contenido',
    homeLabel: 'SHE - YIS BRIGHTCORE LLC, ir al inicio',
    external: '(se abre en una pestaña nueva)',
    logoAlt: 'Símbolo de SHE - YIS BRIGHTCORE: siete luces conectadas en torno a un eje',
  },
  nav: {
    label: 'Principal',
    products: 'Productos',
    ecosystem: 'Ecosistema',
    capabilities: 'Capacidades',
    about: 'Nosotros',
    cta: 'Hablemos',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    langCode: 'EN',
    langName: 'English',
    langLabel: 'Switch to English',
  },
  rail: {
    label: 'Recorrido de la página',
    sections: ['Inicio', 'Neuremy', 'TopoQuizz', 'Ecosistema', 'Capacidades', 'Nosotros', 'Contacto'],
  },
  hero: {
    eyebrow: 'Tecnología aplicada a la educación médica',
    line1: 'Tecnología conectada.',
    line2: 'Innovación sin límites.',
    lead: 'Creamos plataformas y aplicaciones que conectan a estudiantes de medicina con el conocimiento que necesitan: Neuremy para aprender, TopoQuizz para practicar.',
    ctaProducts: 'Conoce nuestros productos',
    ctaContact: 'Hablemos',
    productsLabel: 'Nuestros productos',
    scroll: 'Recorre el eje',
  },
  neuremy: {
    tag: 'Plataforma de estudio',
    title: 'Todo lo que necesitas para estudiar medicina.',
    modulesTitle: 'Seis módulos, una sola plataforma',
    imageAlt:
      'Neuremy en una laptop: clase en video de farmacocinética clínica con la lista de contenidos de la lección y el docente.',
  },
  topoquizz: {
    tag: 'App móvil',
    title: 'Practica medicina jugando.',
    specsLabel: 'TopoQuizz en cifras',
    imageAlts: {
      home: 'Pantalla de inicio de TopoQuizz con las materias Farmacología y Anatomía.',
      quiz: 'Pregunta de TopoQuizz con cronómetro, nivel de dificultad y cuatro opciones.',
      progress: 'Pantalla de progreso de TopoQuizz con la explicación de una pregunta.',
    },
  },
  ecosystem: {
    tag: 'Ecosistema',
    title: 'Aprende. Practica. Mide.',
    lead: 'Dos productos que se conectan en un mismo flujo de estudio.',
    stepLabel: 'Paso',
    steps: [
      {
        id: 'learn',
        verb: 'Aprende',
        product: 'Neuremy',
        text: 'Video clases, casos clínicos y resúmenes para entender cada tema a fondo.',
      },
      {
        id: 'practice',
        verb: 'Practica',
        product: 'TopoQuizz',
        text: 'Quizzes con cronómetro y explicaciones para fijar lo aprendido.',
      },
      {
        id: 'measure',
        verb: 'Mide',
        product: 'Neuremy · TopoQuizz',
        text: 'Progreso y estadísticas por tema para saber exactamente qué reforzar.',
      },
    ],
  },
  capabilities: {
    tag: 'Capacidades',
    title: 'Software a medida, con inteligencia artificial aplicada.',
    lead: 'Diseñamos y construimos herramientas digitales que responden a necesidades reales de la vida cotidiana y del comercio.',
    items: [
      {
        id: 'custom',
        icon: 'code',
        title: 'Software a medida',
        text: 'Soluciones tecnológicas diseñadas para cada necesidad, de la idea al producto en producción.',
      },
      {
        id: 'apps',
        icon: 'mobile',
        title: 'Apps web y móviles',
        text: 'Plataformas y aplicaciones listas para usarse desde cualquier dispositivo.',
      },
      {
        id: 'subscriptions',
        icon: 'card',
        title: 'Contenido y suscripciones',
        text: 'Plataformas con catálogo de contenido, planes y pagos en línea.',
      },
      {
        id: 'ai',
        icon: 'spark',
        title: 'IA aplicada',
        text: 'Modelos de inteligencia artificial integrados donde aportan valor real.',
      },
      {
        id: 'admin',
        icon: 'panel',
        title: 'Paneles de administración',
        text: 'Gestión de contenido, usuarios y métricas para operar cada producto.',
      },
    ],
  },
  about: {
    tag: 'Nosotros',
    title: 'Siete luces, un eje.',
    text: 'SHE - YIS BRIGHTCORE LLC conecta personas, datos y sistemas desde un eje tecnológico sólido. Nuestro símbolo es una constelación: siete puntos de luz que se ordenan en torno a un eje y se conectan con trazos breves. Uno de ellos, más alto y luminoso, da origen a los demás.',
    tonesLabel: 'Cómo somos',
    tones: [
      { id: 'professional', name: 'Profesional', text: 'Precisión técnica y lenguaje claro.' },
      { id: 'innovative', name: 'Innovador', text: 'Soluciones que anticipan lo que viene.' },
      { id: 'futuristic', name: 'Futurista', text: 'Geometría modular, neón sobre oscuro.' },
    ],
  },
  contact: {
    tag: 'Contacto',
    title: 'Hablemos.',
    text: 'Cuéntanos qué quieres construir, o escríbenos para conocer más sobre Neuremy y TopoQuizz.',
    ctaMail: 'Escríbenos',
    ctaProducts: 'Ver productos',
    mailSubject: 'Hola, SHE - YIS BRIGHTCORE',
  },
  footer: {
    tagline: 'Tecnología conectada. Innovación sin límites.',
    productsTitle: 'Productos',
    legalTitle: 'Legal de los productos',
    legal: [
      { label: 'Neuremy · Privacidad y términos', href: 'https://neuremy.com/legal' },
      { label: 'TopoQuizz · Privacidad', href: 'https://topoquizz.com/privacy' },
      { label: 'TopoQuizz · Términos', href: 'https://topoquizz.com/terms' },
    ],
    rights: 'Todos los derechos reservados.',
  },
};

export type Dictionary = typeof es;
