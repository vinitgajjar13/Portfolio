
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SOCIAL_LINKS } from '../constants';
import ScrollFloat from './ScrollFloat';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="max-w-[1440px] mx-auto px-3 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12 lg:gap-24 items-start relative overflow-hidden py-12 sm:py-16 md:py-20">
      <motion.div style={{ y: y1 }} className="space-y-6 sm:space-y-8 z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-black dark:text-white">
          <ScrollFloat animationDuration={1} ease='backOut' stagger={0.02}>
            Outside work I love learning new tech, reading, and traveling — always testing new UI ideas while sipping chai.
          </ScrollFloat>
        </h2>
        <div className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light max-w-xl">
          <ScrollFloat animationDuration={1.2} ease={[0.22, 1, 0.36, 1]} stagger={0.03}>
            I bridge the gap between imagination and reality by crafting digital experiences that resonate on an emotional level.
          </ScrollFloat>
        </div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="flex flex-col h-full md:border-l border-black/10 dark:border-white/10 md:pl-8 lg:md:pl-12 py-4 relative">
        <div className="absolute -left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#A87E30] rounded-full hidden md:block" />
        <h3 className="text-lg sm:text-xl md:text-2xl font-medium mb-8 sm:mb-12 uppercase tracking-widest text-gray-400 text-xs">More About Me</h3>

        <div className="space-y-6 mb-12">
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed italic">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
        </div>

        <div className="mt-auto flex gap-4 sm:gap-6">
          {SOCIAL_LINKS.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              whileHover={{ scale: 1.2, rotate: 10, backgroundColor: "#A87E30" }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center transition-all shadow-lg flex-shrink-0"
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div >
  );
};

export default About;
