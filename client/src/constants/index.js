import {
  mobile,
  backend,
  creator,
  web,
  
  blockchain,
  ipfs,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Guide",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "React js (Front-End)",
    icon: reactjs,
  },
  {
    title: "Node. js (Back-End)",
    icon: nodejs,
  },
  {
    title: "Ethereum Blockchain",
    icon: blockchain,
  },
  {
    title: "IPFS file system",
    icon: ipfs,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  // {
  //   name: "TypeScript",
  //   icon: typescript,
  // },
  {
    name: "React JS",
    icon: reactjs,
  },
  // {
  //   name: "Redux Toolkit",
  //   icon: redux,
  // },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  // {
  //   name: "docker",
  //   icon: docker,
  // },
];

const experiences = [
  {
    title: "Download MetaMask",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "linear-gradient(to right, indigo,  purple)",
    date: "",
    points: [
      "Visit the official MetaMask website or use your browser's extension store to download MetaMask.",
      "Install the MetaMask extension on your browser (e.g., Chrome, Firefox).",
      
    ],
  },
  {
    title: "Create an Account",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "linear-gradient(to right, purple,  indigo)",
    date: "",
    points: [
      "Click on the MetaMask extension icon in your browser.",
      "Follow the prompts to create a new MetaMask account.",
      "Set up a strong password and securely back up your seed phrase.",
    ],
  },
  {
    title: "Registration and Login",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "linear-gradient(to right, indigo,  purple)",
    date: "",
    points: [
      "Visit the eVault system's website or application.Click on the Register button.",
      "Provide your email address and phone number for double authentication.",
      "Verify your email and phone number through the confirmation links or codes sent.",
      "Log in to your eVault account using your registered email and password, and verify your phone number if prompted.",
    ],
  },
  {
    title: "Dashboard Navigation",
    company_name: "Meta",
    icon: meta,
    iconBg: "linear-gradient(to right, purple,  indigo)",
    date: "",
    points: [
      "Upon successful login, you'll be directed to your dashboard.",
      "Navigate through different sections such as statistics, file management, and access control.",
    ],
  },
  {
    title: "File Upload",
    company_name: "Meta",
    icon: meta,
    iconBg: "linear-gradient(to right, indigo,  purple)",
    date: "",
    points: [
      "To upload a file, navigate to the file upload section on your dashboard.",
      "Click on the Upload or Add File button. Select the file you want to upload from your device.",
      "Optionally, provide a title, description, and tags for the file."
    ],
  },
  {
    title: "Access Management",
    company_name: "Meta",
    icon: meta,
    iconBg: "linear-gradient(to right, purple,  indigo)",
    date: "",
    points: [
      "To share or remove access to a file, select the file from your dashboard.",
      "Choose the option to share or manage access.",
      "Specify the email addresses or user IDs of recipients you want to share the file with.",
      "Set access permissions (e.g., view-only, edit) as needed.",
      "To remove access, select the user or recipient and choose the option to revoke access."
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
