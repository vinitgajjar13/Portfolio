import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useSpring, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from './components/Navbar';
import Hero from './components/hero';
import About from './components/About';
import Services from './components/Services';
import WorkMarquee from './components/WorkMarquee';
import PortfolioSection from './components/PortfolioSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Lenis from 'lenis';
import { useSystemTheme } from './constants';

const CursorTrail: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#A87E30] pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: '-50%',
        y: '-50%',
        scale: isPointer ? 2.5 : 1,
        backgroundColor: isPointer ? 'rgba(168, 126, 48, 0.2)' : 'transparent',
      }}
      transition={{ scale: { type: 'spring', damping: 20, stiffness: 300 } }}
    />
  );
};

const RevealOnScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] } },
        hidden: { opacity: 0, y: 30 }
      }}
    >
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  useSystemTheme();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      // @ts-ignore - smoothTouch is valid in this version but missing in types
      smoothTouch: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        const targetId = anchor.hash;
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          lenis.scrollTo(targetId, {
            offset: -100, // Adjust for fixed header if needed
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden cursor-none transition-colors duration-300">
      <CursorTrail />
      <Navbar onOpenContact={() => setContactModalOpen(true)} />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about" className="py-20 md:py-32">
          <RevealOnScroll>
            <About />
          </RevealOnScroll>
        </section>

        <section className="py-10">
          <RevealOnScroll>
            <Services />
          </RevealOnScroll>
        </section>

        <section className="py-12 border-y border-black/5 dark:border-white/10 bg-[#FDFDFD] dark:bg-white/5">
          <RevealOnScroll>
            <WorkMarquee />
          </RevealOnScroll>
        </section>

        <section id="projects" className="py-20 md:py-32 space-y-32">
          <RevealOnScroll>
            <PortfolioSection />
          </RevealOnScroll>
        </section>

        <RevealOnScroll>
          <Footer onOpenContact={() => setContactModalOpen(true)} />
        </RevealOnScroll>
      </main>

      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
};

export default App;
