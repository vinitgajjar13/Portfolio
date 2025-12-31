
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { SOCIAL_LINKS, NAV_LINKS } from '../constants';

interface FooterProps {
  onOpenContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <footer ref={containerRef} className="bg-[#FFFFFF] dark:bg-[#0D1117] text-[#1a1a1a] dark:text-gray-100 py-12 sm:py-16 md:py-20 px-3 sm:px-6 md:px-12 mt-16 md:mt-20 relative overflow-hidden transition-colors duration-300">

      {/* Dynamic Background Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] sm:w-[40vw] h-[60vw] sm:h-[40vw] bg-[#A87E30] dark:bg-white/5 rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col h-full justify-between">

        {/* Header Section */}
        <div className="space-y-4 sm:space-y-6 text-center mb-12 md:mb-24">
          {/* <p className="text-gray-500 dark:text-gray-400 font-medium">Got a project? Want to collaborate?</p> */}
          <motion.h1
            style={{ y }}
            className="text-[8vw] sm:text-[10vw] md:text-[12vw] leading-[0.8] font-black tracking-tighter uppercase mix-blend-overlay dark:mix-blend-normal dark:text-white"
          >
            GET IN TOUCH
          </motion.h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 pb-12 md:pb-24 border-b border-black/10 dark:border-white/10">

          {/* Navigation Column */}
          <div className="sm:col-span-1 md:col-span-4 space-y-6 sm:space-y-8">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Navigation</h4>
            <ul className="space-y-3 sm:space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium hover:text-[#A87E30] transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Column */}
          <div className="sm:col-span-1 md:col-span-4 space-y-6 sm:space-y-8">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Socials</h4>
            <ul className="space-y-3 sm:space-y-4">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium hover:text-[#A87E30] transition-colors flex items-center gap-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources/Action Column */}
          <div className="sm:col-span-2 md:col-span-4 space-y-6 sm:space-y-8">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Resources</h4>
            <div className="space-y-4 sm:space-y-6">
              <a href="#" className="block text-base sm:text-lg md:text-xl lg:text-2xl font-medium hover:text-[#A87E30] transition-colors">Portfolio V1</a>
              <button
                onClick={onOpenContact}
                className="group flex items-center gap-3 sm:gap-4 text-base sm:text-lg md:text-xl lg:text-2xl font-medium hover:text-[#A87E30] transition-colors text-left"
              >
                Start a Project
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:bg-[#A87E30] dark:group-hover:bg-[#A87E30] transition-colors flex-shrink-0">
                  <ArrowUp className="rotate-45" size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">

          <div className="space-y-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4 bg-black dark:bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-serif font-bold text-xs sm:text-sm md:text-base text-[#A87E30]">VK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-tight">
              Vinit Karshala
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">© 2025 Vinit Karshala</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 md:gap-12 w-full md:w-auto">
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Local Time</h4>
              <p className="text-base sm:text-lg md:text-xl font-medium">{time}</p>
            </div>

            <button
              onClick={scrollToTop}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-[#A87E30] dark:hover:bg-[#A87E30] transition-all hover:scale-110 shadow-xl flex-shrink-0"
            >
              <ArrowUp size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
