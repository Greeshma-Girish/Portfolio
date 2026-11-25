
import photo1Img from '../assets/photo1.jpg';
import photo2Img from '../assets/photo2.jpg';
import photo3Img from '../assets/photo3.jpg';
import photo4Img from '../assets/photo4.jpg';
import photo5Img from '../assets/photo5.jpg';
import photo6Img from '../assets/home.png';

export const ME = {
  displayName: 'Greeshma',
  name: 'Greeshma Girish',
  role: 'Full-Stack Developer',
  id: 'ID · 0426',
  email: 'gee@gmail.com',
  phone: '+91 00000 00000',
  phoneHref: 'tel:+910000000000',
  li: 'linkedin.com/in/you',
  liHref: 'https://www.linkedin.com/in/greeshmagirish24/',
  gh: 'github.com/you',
  ghHref: 'https://github.com/Greeshma-Girish',
  loc: 'Bengaluru, IN',
  bio: 'Full-stack developer building playful, fast web experiences. Swing the badge, flip it for my contact details.',
};

export const CATEGORIES = {
  Language: '#d9531e',
  Frontend: '#2f80ed',
  Backend: '#27ae60',
  Tools: '#9b51e0',
  Design: '#e0a100',
};

export const SKILLS = [
  { symbol: 'Py', name: 'Python', category: 'Language', note: 'Scripting, data work and small APIs.' },
  { symbol: 'Js', name: 'JavaScript', category: 'Language', note: 'Async code, DOM and modern ES features.' },
  { symbol: 'Ts', name: 'TypeScript', category: 'Language', note: 'Typed React apps and safer refactors.' },
  { symbol: 'Ht', name: 'HTML/CSS', category: 'Frontend', note: 'Semantic layouts, grid, flexbox, animations.' },
  { symbol: 'Re', name: 'React', category: 'Frontend', note: 'Hooks, state design and component patterns.' },
  { symbol: 'Ne', name: 'Next.js', category: 'Frontend', note: 'Routing, SSR and deploying on Vercel.' },
  { symbol: 'Tw', name: 'Tailwind CSS', category: 'Frontend', note: 'Fast, consistent, responsive styling.' },
  { symbol: 'Gs', name: 'GSAP', category: 'Design', note: 'ScrollTrigger timelines and parallax.' },
  { symbol: 'Th', name: 'Three.js', category: 'Design', note: '3D scenes, textures and physics tricks.' },
  { symbol: 'Fg', name: 'Figma', category: 'Design', note: 'Wireframes, prototypes and handoff.' },
  { symbol: 'Nd', name: 'Node.js', category: 'Backend', note: 'Building REST APIs and tooling.' },
  { symbol: 'Ex', name: 'Express', category: 'Backend', note: 'Routing, middleware and auth.' },
  { symbol: 'Mg', name: 'MongoDB', category: 'Backend', note: 'Schema design and aggregation.' },
  { symbol: 'Sq', name: 'SQL', category: 'Backend', note: 'Joins, indexes and query tuning.' },
  { symbol: 'Gt', name: 'Git', category: 'Tools', note: 'Branching, PRs and clean history.' },
  { symbol: 'Dk', name: 'Docker', category: 'Tools', note: 'Containers for repeatable dev setups.' },
  { symbol: 'Vc', name: 'Vercel', category: 'Tools', note: 'CI previews and production deploys.' },
  { symbol: 'Pd', name: 'Pandas', category: 'Tools', note: 'Cleaning and analysing datasets.' },
];
export const PROJECTS = [
  {
    title: 'FinPredict-LLM',
    description:
      'An AI-powered credit risk assessment platform using machine learning, explainable AI, and natural language SQL queries to evaluate financial risk.',
    stack: ['Python', 'LightGBM', 'SQL', 'SHAP', 'Gemini AI', 'Streamlit'],
    live: '',
    gh: 'https://github.com/Greeshma-Girish/credit_risk_platformm',
    gradient: 'linear-gradient(135deg,#344e7a,#8296c9)',
    //img: photo1Img,
  },
  {
    title: 'PillScan-CNN',
    description:
      'An AI-powered medicine identification application that uses computer vision, image classification, and OCR to identify medicines and provide useful information.',
    stack: ['React', 'Python', 'OpenCV', 'TensorFlow', 'OCR', 'MongoDB'],
    live: '',
    gh: 'https://github.com/Greeshma-Girish/truemed',
    gradient: 'linear-gradient(135deg,#287c75,#8bc9b8)',
    //img: photo2Img,
  },
  {
    title: 'SmartSpecs AI',
    description:
      'A full-stack eyewear platform that recommends suitable frames based on face shape, featuring dynamic product retrieval and AWS cloud deployment.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Nginx', 'AWS'],
    live: '',
    gh: 'https://github.com/Greeshma-Girish/eyewear-repo',
    gradient: 'linear-gradient(135deg,#665c45,#c5a880)',
    //img: photo3Img,
  },
  {
    title: 'FoodBites',
    description:
      'A full-stack food delivery application featuring user authentication, food browsing, search, shopping cart, order management, and an admin dashboard.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB'],
    live: '',
    gh: 'https://github.com/Greeshma-Girish/FoodBites_food-deliveryapp',
    gradient: 'linear-gradient(135deg,#e76f51,#f4a261)',
    //img: photo4Img,
  },
  {
    title: 'EcoHarbor-Track',
    description:
      'A sustainable community platform focused on marine conservation, waste management, and environmental awareness with interactive data dashboards.',
    stack: ['React', 'Node.js', 'MongoDB', 'Python'],
    live: '',
    gh: 'https://github.com/Greeshma-Girish/Eco-Harbour',
    gradient: 'linear-gradient(135deg,#2d6a4f,#95d5b2)',
    //img: photo5Img,
  },
  {
    title: 'CommunityConnect',
    description:
      'A collaborative platform designed to connect people, encourage community participation, and support meaningful social initiatives.',
    stack: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
    live: '',
    gh: 'https://github.com/Greeshma-Girish/We-Together',
    gradient: 'linear-gradient(135deg,#d97757,#e9b872)',
    //img: photo6Img,
  },
];

export const HOBBIES = [
  {
    title: 'UI/UX Design',
    tags: ['Wireframing', 'Prototyping', 'Figma', 'Design Systems'],
    desc: 'Crafting polished, user-centred interfaces — from quick wireframes to full component libraries and interactive prototypes in Figma.',
    link: 'https://www.figma.com/',
    linkLabel: 'Figma ↗',
  },
  {
    title: '3D & Blender',
    tags: ['Blender', 'Animations', 'Modelling', 'Rendering'],
    desc: 'Sculpting 3D scenes and looping animations in Blender — stylised props, motion graphics, and experiments with Cycles rendering.',
    link: 'https://www.blender.org/',
    linkLabel: 'Blender ↗',
  },
  {
    title: 'Photography',
    tags: ['Street', 'Portrait', 'Lightroom', 'Composition'],
    desc: 'Finding geometry in everyday moments. I shoot on a mirrorless and edit with Lightroom, chasing clean light and candid human stories.',
    link: '',
    linkLabel: '',
  },
  {
    title: 'Video Editing',
    tags: ['Premiere Pro', 'DaVinci', 'Color Grading', 'Motion'],
    desc: 'Turning raw footage into polished narratives — colour grading, motion titles, and storytelling through cuts that actually breathe.',
    link: '',
    linkLabel: '',
  },
];

export const EXPERIENCES = [
  {
    period: 'NOV 2025 – FEB 2026',
    title: 'QA Analyst Intern · Airtory',
    bullets: [
      'Tested and evaluated 45+ interactive rich media advertising experiences across multiple devices and browsers.',
      'Worked on 8 programmatic advertising campaigns, validating HTML5 ad tags, landing pages, and DSP integrations.',
      'Collaborated with development teams to identify issues and improve the quality of advertising experiences.',
    ],
    chips: ['Quality Assurance', 'Manual Testing', 'HTML5', 'BrowserStack'],
  },
  {
    period: 'JUL 2026 – SEP 2026',
    title: 'Engineer Intern · Titan Company Limited',
    bullets: [
      'Contributed to an AI-powered eyewear application involving face detection and facial analysis.',
      'Worked with AWS services including EC2, ECS, and ECR for application deployment and infrastructure.',
      'Assisted in Docker-based workflows and automated CI/CD pipelines using GitHub Actions.',
      'Performed API testing and cross-browser validation using Postman and BrowserStack.',
    ],
    chips: ['AWS', 'Docker', 'React', 'GitHub Actions', 'Postman'],
  },
];