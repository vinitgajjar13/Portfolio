
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';

const WorkMarquee: React.FC = () => {
  const items = Array(12).fill("Vinit Karshala");
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const skew = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);

  return (
    <div className="overflow-hidden whitespace-nowrap py-8 bg-black text-white">
      <motion.div
        style={{ skew }}
        className="animate-marquee flex gap-16 items-center"
      >
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-16">
            <span className="text-7xl md:text-9xl font-bold tracking-tighter font-serif uppercase opacity-20 hover:opacity-100 transition-opacity cursor-default">
              {item}
            </span>
            <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#A87E30] stroke-1">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default WorkMarquee;
