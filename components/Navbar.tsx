import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <div className="fixed top-3 sm:top-6 left-0 right-0 flex justify-center z-50 px-3 sm:px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: hidden ? -100 : 0, opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className={`pointer-events-auto relative px-3 sm:px-4 md:px-3 py-2.5 sm:py-3 md:py-2.5 rounded-full border border-white/20 shadow-xl backdrop-blur-md transition-all duration-300 flex items-center justify-between gap-8 sm:gap-12 md:gap-4
          ${isScrolled ? 'bg-white/80 dark:bg-[#1a1a1a]/80 w-auto' : 'bg-white/50 dark:bg-black/30 w-auto'}`}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer ml-0.5 sm:ml-1 flex-shrink-0"
          >
            <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-[#A87E30]">VK</span>
          </motion.div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1.5 p-1">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <motion.a
                  href={link.href}
                  onMouseEnter={() => setActiveTab(link.name)}
                  onMouseLeave={() => setActiveTab('')}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200
                  ${activeTab === link.name ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                  {activeTab === link.name && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#1a1a1a] dark:bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.name}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Contact Button (Desktop) & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 mr-0.5 sm:mr-1 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenContact}
              className="hidden md:block px-6 py-2.5 bg-[#A87E30] hover:bg-[#8f6b28] text-white text-sm font-medium rounded-full shadow-lg shadow-orange-900/10 transition-colors"
            >
              Let's Talk
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-sm flex-shrink-0"
            >
              <Menu size={18} className="sm:block" />
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-[#1a1a1a] p-4 sm:p-6 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 sm:mb-10">
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#A87E30] pl-1 sm:pl-2">VK</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 sm:p-4 text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-all flex items-center justify-between group"
                  >
                    {link.name}
                    <span className="w-2 h-2 rounded-full bg-[#A87E30] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="mt-4 sm:mt-6 w-full py-3 sm:py-4 bg-[#1a1a1a] dark:bg-white text-white dark:text-black rounded-2xl font-medium text-base sm:text-lg hover:bg-black dark:hover:bg-gray-200 transition-colors"
                >
                  Get in Touch
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
