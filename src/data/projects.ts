export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: "web" | "mobile" | "design";
}

export const projects: Project[] = [
  {
    id: "nextjs-portfolio",
    title: "Developer Portfolio",
    description: "Modern portfolio website built with Next.js and Tailwind CSS",
    fullDescription:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS. The site features a clean design with smooth animations, dark mode support, and optimized performance. It includes sections for showcasing projects, skills, and contact information.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Server-side rendering",
      "Dynamic routing",
      "Responsive design",
      "Dark mode",
      "SEO optimization",
      "Contact form integration",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/charan/portfolio",
    category: "web",
  },
  {
    id: "e-commerce-platform",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce platform with payment integration",
    fullDescription:
      "A comprehensive e-commerce platform built with Next.js, Node.js, and MongoDB. It features product listings, cart functionality, user authentication, and Stripe payment integration. The admin dashboard allows for easy product and inventory management.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop",
    technologies: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express",
      "Stripe API",
      "Redux",
      "TypeScript",
    ],
    features: [
      "User authentication",
      "Product filtering",
      "Shopping cart",
      "Payment processing",
      "Order tracking",
      "Admin dashboard",
      "Responsive design",
    ],
    liveUrl: "https://example-shop.com",
    githubUrl: "https://github.com/charan/ecommerce",
    category: "web",
  },
  {
    id: "task-management",
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates",
    fullDescription:
      "A collaborative task management application built with React and Firebase. It allows users to create, assign, and track tasks in real-time. Features include project organization, due dates, task priorities, and team collaboration tools.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1469&auto=format&fit=crop",
    technologies: [
      "React",
      "Firebase",
      "Tailwind CSS",
      "React Query",
      "TypeScript",
    ],
    features: [
      "Real-time updates",
      "User roles",
      "Task assignment",
      "Due date tracking",
      "Project organization",
      "Notification system",
      "Mobile responsive",
    ],
    liveUrl: "https://task-app.example.com",
    githubUrl: "https://github.com/charan/task-manager",
    category: "web",
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with data visualization",
    fullDescription:
      "An interactive weather dashboard that provides real-time weather data and forecasts for locations worldwide. Built with React and integrated with the OpenWeather API, it features interactive maps, detailed weather information, and beautiful data visualizations.",
    image:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1451&auto=format&fit=crop",
    technologies: [
      "React",
      "D3.js",
      "OpenWeather API",
      "Leaflet",
      "Tailwind CSS",
    ],
    features: [
      "Real-time weather updates",
      "5-day forecast",
      "Interactive maps",
      "Data visualization",
      "Location search",
      "Unit conversion",
      "Responsive design",
    ],
    liveUrl: "https://weather.example.com",
    githubUrl: "https://github.com/charan/weather-app",
    category: "web",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
