export type Locale = 'en' | 'es'

export type SkillCategory =
  | 'All'
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Cloud'
  | 'Security'

export interface SkillItem {
  name: string
  category: Exclude<SkillCategory, 'All'>
  level: number
  mark: string
  color: string
}

export type ProjectStatus = 'Featured' | 'Completed' | 'In Progress' | 'Archived'

export interface Project {
  id: string
  title: string
  summary: string
  description: string
  stack: string[]
  status: ProjectStatus[]
  url: string
  image: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
  tech: string[]
}

export interface Education {
  id: string
  degree: string
  school: string
  period: string
  note: string
}

export interface SpokenLanguage {
  name: string
  level: string
}

export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export const PROFILE = {
  name: 'Luis Fernando González Ramírez',
  shortName: 'Luis González',
  brand: 'Luis Fernando',
  title: 'Senior Full Stack Developer',
  location: 'Mexico City, Mexico',
  country: 'Mexico',
  experienceYears: '7+',
  email: 'Luis0817@proton.me',
  github: '',
  githubHandle: '',
  avatar: assetUrl('/images/luis.jpg'),
  availability: 'Available for remote & hybrid work across LATAM and US time zones',
}

export const COPY = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      work: 'Work',
      education: 'Education',
      contact: 'Contact',
      hire: 'Hire me',
    },
    hero: {
      location: 'Mexico City · Mexico',
      title: 'Senior Full Stack Developer',
      headline:
        'Building scalable web platforms, commerce systems, and polished product UIs — frontend to backend to cloud.',
      ctaProjects: 'View projects',
      ctaContact: 'Contact',
      highlights: [
        { label: 'Experience', value: '7+ years' },
        { label: 'Focus', value: 'Full Stack' },
        { label: 'Languages', value: 'ES · EN' },
      ],
    },
    about: {
      eyebrow: 'About',
      title: 'My story',
      lead:
        'Senior full stack developer from Mexico with 7+ years shipping production web apps, commerce platforms, and cloud-backed product experiences.',
      paragraphs: [
        'I work across the stack — React and Next.js on the frontend, Node/Python APIs on the backend, and reliable data layers with PostgreSQL, Redis, and modern cloud deployments.',
        'My work spans POS & retail platforms, digital marketing sites, fintech product surfaces, e-commerce, subscription products, automotive portals, WordPress ecosystems, and SaaS admin systems.',
        'Based in Mexico City, I collaborate with remote teams across LATAM, Europe, and the US — owning features end-to-end from architecture through polished UI and stable releases.',
      ],
      traits: [
        { label: 'Focus', value: 'Full stack product delivery' },
        { label: 'Strength', value: 'UI craft + solid backends' },
        { label: 'Style', value: 'Own the hard parts end-to-end' },
      ],
    },
    skills: {
      eyebrow: 'Tech stack',
      title: 'Skills ranked for production',
      subtitle:
        'Full-stack languages, frameworks, databases, and cloud tools measured against real shipping work.',
      search: 'Search skills…',
      empty: 'No skills match your filter.',
      levelGuide: 'Proficiency reflects daily-driver depth in production systems.',
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'Selected work in production',
      subtitle:
        'Live products and platforms I helped build across commerce, marketing, fintech, subscriptions, and SaaS.',
      open: 'Open project',
      stack: 'Stack',
    },
    work: {
      eyebrow: 'Career',
      title: 'Where I’ve shipped',
    },
    education: {
      eyebrow: 'Academic',
      title: 'Education',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'We need to talk',
      lead: 'Have a product to build or a team that needs a senior full stack partner? Send a short note and I’ll get back soon.',
      note: 'Share your name, how to reach you, and what you’re building.',
      formTitle: 'Send a message',
      name: 'Your name *',
      email: 'Your email *',
      subject: 'Subject',
      message: 'Message *',
      send: 'Send message',
      error: 'Please include your name and a short message.',
      sent: 'Opening your email app to send to Luis0817@proton.me…',
    },
    footer: {
      designed: 'Designed & developed in Mexico',
    },
  },
  es: {
    nav: {
      about: 'Sobre mí',
      skills: 'Skills',
      projects: 'Proyectos',
      work: 'Experiencia',
      education: 'Educación',
      contact: 'Contacto',
      hire: 'Contrátame',
    },
    hero: {
      location: 'Ciudad de México · México',
      title: 'Desarrollador Full Stack Senior',
      headline:
        'Construyo plataformas web escalables, sistemas de comercio y UIs de producto — del frontend al backend y a la nube.',
      ctaProjects: 'Ver proyectos',
      ctaContact: 'Contacto',
      highlights: [
        { label: 'Experiencia', value: '7+ años' },
        { label: 'Enfoque', value: 'Full Stack' },
        { label: 'Idiomas', value: 'ES · EN' },
      ],
    },
    about: {
      eyebrow: 'Sobre mí',
      title: 'Mi historia',
      lead:
        'Desarrollador full stack senior desde México con 7+ años entregando apps web, plataformas de comercio y experiencias de producto en la nube.',
      paragraphs: [
        'Trabajo de punta a punta — React y Next.js en frontend, APIs en Node/Python, y capas de datos confiables con PostgreSQL, Redis y despliegues cloud modernos.',
        'Mi trabajo abarca plataformas POS y retail, sitios de marketing digital, fintech, e-commerce, suscripciones, portales automotrices, ecosistemas WordPress y sistemas SaaS.',
        'Desde Ciudad de México colaboro con equipos remotos en LATAM, Europa y EE.UU. — dueño de features de arquitectura a UI pulida y releases estables.',
      ],
      traits: [
        { label: 'Enfoque', value: 'Entrega full stack de producto' },
        { label: 'Fortaleza', value: 'UI + backends sólidos' },
        { label: 'Estilo', value: 'Dueño de las partes difíciles' },
      ],
    },
    skills: {
      eyebrow: 'Stack técnico',
      title: 'Skills rankeadas para producción',
      subtitle:
        'Lenguajes, frameworks, bases de datos y cloud full-stack medidos contra trabajo real entregado.',
      search: 'Buscar skills…',
      empty: 'Ninguna skill coincide con tu filtro.',
      levelGuide: 'La competencia refleja profundidad de uso diario en sistemas de producción.',
    },
    projects: {
      eyebrow: 'Portafolio',
      title: 'Trabajo seleccionado en producción',
      subtitle:
        'Productos y plataformas en vivo que ayudé a construir en comercio, marketing, fintech, suscripciones y SaaS.',
      open: 'Abrir proyecto',
      stack: 'Stack',
    },
    work: {
      eyebrow: 'Carrera',
      title: 'Dónde he entregado',
    },
    education: {
      eyebrow: 'Académico',
      title: 'Educación',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Necesitamos hablar',
      lead: '¿Tienes un producto por construir o un equipo que necesita un full stack senior? Envía una nota breve y te respondo pronto.',
      note: 'Comparte tu nombre, cómo contactarte y qué estás construyendo.',
      formTitle: 'Enviar mensaje',
      name: 'Tu nombre *',
      email: 'Tu correo *',
      subject: 'Asunto',
      message: 'Mensaje *',
      send: 'Enviar mensaje',
      error: 'Incluye tu nombre y un mensaje breve.',
      sent: 'Abriendo tu app de correo para enviar a Luis0817@proton.me…',
    },
    footer: {
      designed: 'Diseñado y desarrollado en México',
    },
  },
} as const

export const LANGUAGES: SpokenLanguage[] = [
  { name: 'Spanish', level: 'Native' },
  { name: 'English', level: 'Fluent' },
]

export const SKILL_FILTERS: SkillCategory[] = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Cloud',
  'Security',
]

export const SKILL_ITEMS: SkillItem[] = [
  { name: 'TypeScript', category: 'Languages', level: 96, mark: 'TS', color: '#3178C6' },
  { name: 'JavaScript', category: 'Languages', level: 96, mark: 'JS', color: '#F7DF1E' },
  { name: 'Python', category: 'Languages', level: 90, mark: 'Py', color: '#3776AB' },
  { name: 'PHP', category: 'Languages', level: 86, mark: 'PHP', color: '#777BB4' },
  { name: 'SQL', category: 'Languages', level: 93, mark: 'SQL', color: '#336791' },
  { name: 'Go', category: 'Languages', level: 78, mark: 'Go', color: '#00ADD8' },
  { name: 'React', category: 'Frontend', level: 96, mark: 'Re', color: '#61DAFB' },
  { name: 'Next.js', category: 'Frontend', level: 94, mark: 'N', color: '#111111' },
  { name: 'Vue.js', category: 'Frontend', level: 84, mark: 'Vu', color: '#42B883' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 95, mark: 'Tw', color: '#06B6D4' },
  { name: 'HTML5 / CSS3', category: 'Frontend', level: 97, mark: 'H5', color: '#E34F26' },
  { name: 'GSAP', category: 'Frontend', level: 84, mark: 'GS', color: '#88CE02' },
  { name: 'Framer Motion', category: 'Frontend', level: 86, mark: 'FM', color: '#0055FF' },
  { name: 'Shopify / Liquid', category: 'Frontend', level: 88, mark: 'Sh', color: '#96BF48' },
  { name: 'WordPress', category: 'Frontend', level: 85, mark: 'WP', color: '#21759B' },
  { name: 'Vite', category: 'Frontend', level: 92, mark: 'Vi', color: '#646CFF' },
  { name: 'Node.js', category: 'Backend', level: 94, mark: 'No', color: '#339933' },
  { name: 'Express', category: 'Backend', level: 90, mark: 'Ex', color: '#444444' },
  { name: 'NestJS', category: 'Backend', level: 88, mark: 'Ne', color: '#E0234E' },
  { name: 'FastAPI', category: 'Backend', level: 86, mark: 'Fa', color: '#009688' },
  { name: 'Laravel', category: 'Backend', level: 84, mark: 'La', color: '#FF2D20' },
  { name: 'GraphQL', category: 'Backend', level: 85, mark: 'GQL', color: '#E10098' },
  { name: 'REST APIs', category: 'Backend', level: 95, mark: 'API', color: '#0EA5E9' },
  { name: 'WebSockets', category: 'Backend', level: 86, mark: 'WS', color: '#0284C7' },
  { name: 'PostgreSQL', category: 'Databases', level: 93, mark: 'Pg', color: '#4169E1' },
  { name: 'MySQL', category: 'Databases', level: 90, mark: 'My', color: '#4479A1' },
  { name: 'Redis', category: 'Databases', level: 88, mark: 'Rd', color: '#DC382D' },
  { name: 'MongoDB', category: 'Databases', level: 82, mark: 'Mg', color: '#47A248' },
  { name: 'Prisma', category: 'Databases', level: 86, mark: 'Pr', color: '#2D3748' },
  { name: 'AWS', category: 'Cloud', level: 88, mark: 'AWS', color: '#FF9900' },
  { name: 'Docker', category: 'Cloud', level: 90, mark: 'Dk', color: '#2496ED' },
  { name: 'Vercel', category: 'Cloud', level: 88, mark: 'Ve', color: '#111111' },
  { name: 'Firebase', category: 'Cloud', level: 84, mark: 'Fb', color: '#FFCA28' },
  { name: 'CI/CD', category: 'Cloud', level: 88, mark: 'CI', color: '#2088FF' },
  { name: 'Cloudflare', category: 'Cloud', level: 82, mark: 'Cf', color: '#F38020' },
  { name: 'JWT / OAuth2', category: 'Security', level: 90, mark: 'Au', color: '#D63AFF' },
  { name: 'OWASP Basics', category: 'Security', level: 86, mark: 'OW', color: '#991B1B' },
  { name: 'Stripe / Payments', category: 'Security', level: 84, mark: 'St', color: '#635BFF' },
]

export const PROJECTS: Project[] = [
  {
    id: 'lightspeed',
    title: 'Lightspeed',
    summary: 'POS & commerce platform for retail, restaurants, and golf — sell in person and online.',
    description:
      'Full-stack product work around a connected commerce platform: payments, inventory, insights, and omnichannel selling for businesses that need to scale operations without fracturing systems.',
    stack: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Cloud'],
    status: ['Featured', 'Completed'],
    url: 'https://www.lightspeedhq.com/',
    image: assetUrl('/images/projects/lightspeed.jpg?v=3'),
  },
  {
    id: 'infinigrowth',
    title: 'Infini Growth Media',
    summary: 'Digital marketing & web development agency site focused on SEO, ads, and lead systems.',
    description:
      'Conversion-focused agency platform covering website development, SEO, Meta/Google Ads, social growth, landing pages, and CRM/SaaS tooling as one growth stack.',
    stack: ['React', 'PHP', 'Laravel', 'MySQL', 'Tailwind CSS'],
    status: ['Featured', 'Completed'],
    url: 'https://infinigrowthmedia.in/',
    image: assetUrl('/images/projects/infinigrowth.jpg?v=3'),
  },
  {
    id: 'dre',
    title: 'DRE App',
    summary: 'Fintech product for saving, spending, investing, and moving money globally.',
    description:
      'Product surfaces for a modern money app — earn flows, transparency dashboards, deposits, and reward experiences with a polished mobile-first UI.',
    stack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'APIs'],
    status: ['Featured', 'Completed'],
    url: 'https://www.dre.app/',
    image: assetUrl('/images/projects/dre.jpg?v=3'),
  },
  {
    id: 'casadoartesao',
    title: 'Casa do Artesão',
    summary: 'Brazilian e-commerce for craft materials — molds, biscuit, paints, and tools.',
    description:
      'Catalog commerce experience with promotions, category browsing, cart flows, and nationwide shipping messaging for artisans and hobbyists across Brazil.',
    stack: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'Payments'],
    status: ['Featured', 'Completed'],
    url: 'https://www.casadoartesao.com.br/',
    image: assetUrl('/images/projects/casadoartesao.jpg?v=3'),
  },
  {
    id: 'busybox',
    title: 'The Busy Box',
    summary: 'Award-winning UK kids craft subscription with screen-free monthly activity boxes.',
    description:
      'Subscription commerce site for story-based craft kits — age plans, sibling boxes, party bags, and conversion storytelling for parents of children aged 1–6.',
    stack: ['Shopify', 'JavaScript', 'CSS', 'Subscriptions'],
    status: ['Featured', 'Completed'],
    url: 'https://www.thebusybox.co.uk/',
    image: assetUrl('/images/projects/busybox.jpg?v=3'),
  },
  {
    id: 'infocar',
    title: 'InfoCar.ua',
    summary: 'Ukraine’s automotive portal for new cars, used listings, reviews, and dealer catalogs.',
    description:
      'Large-scale automotive content and marketplace experience — model catalogs, listings search, test drives, news, and dealer discovery across thousands of vehicles.',
    stack: ['PHP', 'JavaScript', 'MySQL', 'REST APIs'],
    status: ['Completed'],
    url: 'https://www.infocar.ua/',
    image: assetUrl('/images/projects/infocar.jpg?v=3'),
  },
  {
    id: 'templately',
    title: 'Templately',
    summary: 'AI-powered WordPress template cloud for Elementor and Gutenberg creators.',
    description:
      'Product marketing and template-cloud experience for launching WordPress sites fast — packs, AI customization flows, cloud workspace, and creator onboarding.',
    stack: ['WordPress', 'React', 'JavaScript', 'PHP', 'Cloud'],
    status: ['Featured', 'Completed'],
    url: 'https://templately.com/',
    image: assetUrl('/images/projects/templately.jpg?v=3'),
  },
  {
    id: 'praktora',
    title: 'PraktoraWeb',
    summary: 'Insurance broking workflow platform for CRM, placements, claims, and operations.',
    description:
      'Business-process SaaS for insurance brokers — CRM, documents, placements, finance modules, alerts, and multi-country operations workflows.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Cloud'],
    status: ['Completed'],
    url: 'https://www.praktora.com/',
    image: assetUrl('/images/projects/praktora.jpg?v=3'),
  },
  {
    id: 'klip',
    title: 'Klip Agency',
    summary: 'Performance media agency site for Meta, TikTok, and Google Ads buyers.',
    description:
      'Agency portfolio and acquisition site highlighting ROAS case studies, landing-page work, and performance-based growth services.',
    stack: ['Webflow', 'JavaScript', 'CSS', 'Analytics'],
    status: ['Completed'],
    url: 'https://agency.klipml.com/',
    image: assetUrl('/images/projects/klip.jpg?v=3'),
  },
  {
    id: 'shopibrands',
    title: 'Shopibrands',
    summary: 'Shopify agency built by sellers — setup, UX, custom code, SEO, and launch support.',
    description:
      'Agency site and service system for Shopify stores: migrations, theme work, app integrations, email marketing, and fast 7–10 day delivery workflows.',
    stack: ['Shopify', 'Liquid', 'JavaScript', 'UX'],
    status: ['Featured', 'Completed'],
    url: 'https://shopibrands.com/',
    image: assetUrl('/images/projects/shopibrands.jpg?v=3'),
  },
]

export const EXPERIENCE: Experience[] = [
  {
    id: 'senior',
    title: 'Senior Full Stack Developer',
    company: 'Independent · Product & Agency Clients',
    location: 'Mexico · Remote',
    period: '2022 — Present',
    bullets: [
      'Led full-stack delivery for commerce, marketing, fintech, and SaaS products — React/Next.js frontends with Node/Python APIs and cloud deployments.',
      'Shipped storefronts, subscription flows, dashboards, and high-conversion landing systems with measurable performance and clean UX.',
      'Owned architecture decisions, auth/security basics, CI-friendly releases, and collaboration with design and growth stakeholders.',
    ],
    tech: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    company: 'Digital Products & Commerce Teams',
    location: 'Remote · International clients',
    period: '2019 — 2022',
    bullets: [
      'Built and maintained production web apps across e-commerce, content portals, and marketing platforms.',
      'Integrated payments, CRM/lead systems, analytics, and third-party APIs into stable product workflows.',
      'Improved front-end performance and backend reliability through iterative refactors and clearer component architecture.',
    ],
    tech: ['React', 'PHP', 'Laravel', 'Node.js', 'MySQL', 'Shopify', 'REST APIs'],
  },
  {
    id: 'web',
    title: 'Web Developer',
    company: 'Freelance & Studio Work',
    location: 'Mexico',
    period: '2018 — 2019',
    bullets: [
      'Delivered business websites, admin tools, and early SaaS features for local and remote clients.',
      'Established foundational full-stack habits across HTML/CSS/JS and PHP/MySQL stacks that scaled into senior delivery work.',
    ],
    tech: ['JavaScript', 'PHP', 'MySQL', 'WordPress', 'HTML5', 'CSS3'],
  },
]

export const EDUCATION: Education[] = [
  {
    id: 'cs',
    degree: 'Bachelor of Science in Computer Science',
    school: 'Universidad Nacional Autónoma de México (UNAM)',
    period: '2018 — 2023',
    note: 'Focus on software architecture, distributed systems, databases, and web application development.',
  },
  {
    id: 'electronics',
    degree: 'Technical Electronics & Systems',
    school: 'CECyT · IPN',
    period: '2015 — 2018',
    note: 'Foundational training in electronics, systems thinking, and problem-solving that still informs how I design software stacks.',
  },
]

export const NAV_IDS = [
  'about',
  'skills',
  'projects',
  'work',
  'education',
  'contact',
] as const

export const SECTION_IDS = ['top', ...NAV_IDS] as const
