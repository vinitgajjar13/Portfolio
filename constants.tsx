
import React, { useEffect, useState } from 'react';
import { Linkedin, Github, Instagram, ArrowUpRight } from 'lucide-react';
import { Project, Service } from './types';
import pragalbh_hero from "./assets/public/pragalbh_hero.png";
import pragalbh_guj from "./assets/public/pragalbh_guj.png";
import gurukrupa from "./assets/public/gurukrupa.png"
import jewellery from "./assets/public/jewellery.png"
import doctor_app from "./assets/public/doctor_app.png"

export const SOCIAL_LINKS = [
  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/vinit-karshala-953a01229/", label: "LinkedIn" },
  { icon: <Github size={20} />, href: "https://github.com/vinitgajjar13", label: "GitHub" },
  { icon: <Instagram size={20} />, href: "https://www.instagram.com/ganzattux?igsh=bWl4cjQ0Y3V0dTFq", label: "Instagram" },
];

export const SERVICES: Service[] = [
  {
    title: "UI/UX Design",
    description: "I create Stunning designs that engage and inspire your audience. Let me bring your brand to life with my skills."
  },
  {
    title: "App Designer",
    description: "I specialize in transforming ideas into elegant, high-performing mobile applications."
  },
  {
    title: "Web Designer",
    description: "I develop elegant, responsive websites that blend visual appeal with smooth functionality for every device."
  },
  // {
  //   title: "SEO Optimizer",
  //   description: "I help websites achieve higher rankings, attract organic traffic, and improve overall user engagement to boost business growth."
  // }
];

export const PROJECTS: Project[] = [
  {
    id: "Jewellery",
    title: "Jewellery Website",
    category: "(Website Design)",
    description: "A sleek and modern portfolio website designed to showcase creative work with elegance. Featuring smooth animations, responsive layout, and a focus on typography to highlight the content effectively.",
    imageUrl: jewellery,
    images: [
      jewellery

    ],
    technologies: ["FIGMA", "WireFrame", "HTML", "CSS"],
    
  },
   {
    id: "Medi-AI",
    title: "Medi_AI App",
    category: "(APP Design)",
    description: "A sleek and modern portfolio website designed to showcase creative work with elegance. Featuring smooth animations, responsive layout, and a focus on typography to highlight the content effectively.",
    imageUrl: doctor_app,
    images: [
        doctor_app

    ],
    technologies: ["FIGMA", "WireFrame"],
    
  },
  {
    id: "GuruKrupa",
    title: "GuruKrupa Storage and shifting solution",
    category: "(Website Design)",
    description: "A sleek and modern portfolio website designed to showcase creative work with elegance. Featuring smooth animations, responsive layout, and a focus on typography to highlight the content effectively.",
    imageUrl: gurukrupa,
    images: [
      gurukrupa

    ],
    technologies: ["FIGMA", "WireFrame", "HTML", "CSS"],
    
  },

  {
    id: "Pragalbh Associates",
    title: "Pragalbh Website",
    category: "(Website Development)",
    description: "A sleek and modern portfolio website designed to showcase creative work with elegance. Featuring smooth animations, responsive layout, and a focus on typography to highlight the content effectively.",

    imageUrl: pragalbh_hero,
    images: [
      pragalbh_hero,
      pragalbh_guj

    ],
    technologies: ["React", "FIGMA", "MERN Stack", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Framer Motion", "TypeScript", "Git", "GitHub", "Vercel"],
    link: "https://www.pragalbh.co.in/"
  }
];

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' },
  { name: 'Project', href: '#projects' },
];

export const useSystemTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    // Check initial system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return theme;
};
