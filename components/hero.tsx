
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Layered depth values
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const subTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const name = "Karshala Vinit";
  const nameChars = name.split("");

  // Fix: Explicitly type variants and cast ease to cubic-bezier tuple to resolve TS errors
  const charVariants: Variants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.5 + i * 0.05,
        duration: 1,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div ref={containerRef} className="pt-20 sm:pt-28 md:pt-32 px-3 sm:px-4 md:px-8 max-w-[1560px] mx-auto overflow-hidden min-h-screen sm:min-h-[95vh] flex flex-col justify-center">
      <div className="relative w-full aspect-[3/5] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl sm:rounded-[40px] overflow-hidden group bg-gray-100 shadow-2xl">
        <motion.img
          style={{ y: bgY, scale, objectPosition: '25% center' }}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          src="assets/vinit_hero.png"
          alt="Vinit Karshala Portrait"
          className="w-full h-full object-cover grayscale brightness-75"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 p-4 sm:p-8 md:p-16 text-white w-full z-10">
          <motion.div style={{ y: subTextY, opacity }}>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-base sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 flex items-center gap-4"
            >
              {/* <span className="w-16 h-px bg-[#A87E30]" />
              Digital Experience Creator */}
            </motion.p>
          </motion.div>

          <motion.div style={{ y: textY }} className="flex flex-wrap overflow-hidden mb-4 sm:mb-8">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[9vw] font-bold leading-none inline-block drop-shadow-2xl ${char === " " ? "mr-2 sm:mr-4 md:mr-10" : ""}`}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            style={{ opacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="text-xs sm:text-sm md:text-lg lg:text-2xl tracking-[0.3em] sm:tracking-[0.5em] font-light uppercase text-[#A87E30] flex flex-wrap items-center gap-2 sm:gap-4"
          >
            Design <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/30" /> Code <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/30" /> Strategy
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
