
import React, { useState, useRef, useMemo } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '../types';
import ScrollFloat from './ScrollFloat';

const ProjectCard: React.FC<{
  project: Project;
  isEven: boolean;
  onSelect: (p: Project) => void
}> = ({ project, isEven, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yImg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-12 items-center cursor-pointer group/card p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[40px] transition-all duration-500 hover:bg-gray-50/80 dark:hover:bg-white/5 perspective-1000`}
      onClick={() => {
        if (project.id === 'portfolio-website' && project.link) {
          window.open(project.link, '_blank');
        } else {
          onSelect(project);
        }
      }}
    >
      <div className="flex-1 space-y-4 sm:space-y-6 px-0 sm:px-2 md:px-4" style={{ transform: "translateZ(50px)" }}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <h3 className="text-2xl sm:text-4xl md:text-7xl font-bold tracking-tight text-black dark:text-white group-hover/card:text-[#A87E30] transition-colors duration-300 flex-1">
            <ScrollFloat animationDuration={1} ease='backOut'>
              {project.title}
            </ScrollFloat>
          </h3>
          <motion.div
            whileHover={{ rotate: 45, scale: 1.2 }}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 border-black dark:border-white rounded-full flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-xl z-20 flex-shrink-0"
            onClick={(e) => {
              if (project.link) {
                e.stopPropagation();
                window.open(project.link, '_blank');
              }
            }}
          >
            <ArrowUpRight size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </motion.div>
        </div>
        <div className="text-xs sm:text-sm md:text-sm font-bold text-[#A87E30] tracking-widest uppercase border-b-2 border-[#A87E30] inline-block pb-1">
          <ScrollFloat animationDuration={0.8} ease='easeOut'>
            {project.category}
          </ScrollFloat>
        </div>
        <div className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-lg">
          <ScrollFloat animationDuration={1.2} ease={[0.22, 1, 0.36, 1]} stagger={0.02}>
            {project.description}
          </ScrollFloat>
        </div>
      </div>

      <div className="flex-1 w-full relative px-1 sm:px-2 overflow-hidden rounded-2xl md:rounded-[40px] shadow-2xl aspect-[4/3] bg-gray-100 dark:bg-gray-900" style={{ transform: "translateZ(80px)" }}>
        <motion.div
          style={{ y: yImg, scale: scaleImg }}
          className="absolute inset-0 w-full h-[130%]"
        >
          <AnimatePresence>
            {!isLoaded && (
              <motion.div
                key="sophisticated-shimmer"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-10 bg-[#f8f8f8]"
              >
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute inset-0 shimmer opacity-50" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-200 to-transparent" />
                  <div className="flex flex-col gap-4 p-8 h-full">
                    <div className="w-2/3 h-12 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="w-1/2 h-6 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="mt-auto w-1/3 h-8 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const images = project.images || [project.imageUrl];
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 dark:bg-black/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 150 }}
        className="bg-white dark:bg-[#111] w-full max-w-7xl rounded-[50px] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-20 p-4 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-[#A87E30] dark:hover:bg-[#A87E30] transition-all shadow-xl"
        >
          <X size={28} />
        </button>

        <div className="overflow-y-auto">
          <div className="relative group/carousel bg-gray-950 w-full aspect-video flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt={`${project.title} visual ${index + 1}`}
                initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 sm:left-4 md:left-8 p-2 sm:p-3 md:p-5 bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100"
                >
                  <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 sm:right-4 md:right-8 p-2 sm:p-3 md:p-5 bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100"
                >
                  <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}
          </div>

          <div className="p-4 sm:p-8 md:p-12 lg:p-24 space-y-12 md:space-y-16">
            <div className="space-y-3 sm:space-y-4 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold tracking-tighter text-black dark:text-white">{project.title}</h2>
              <p className="text-[#A87E30] text-sm sm:text-base md:text-xl font-bold tracking-[0.3em] uppercase">{project.category}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pt-8 md:pt-12 border-t border-gray-100 dark:border-white/10">
              <div className="md:col-span-8 space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-8">
                  <h4 className="text-2xl sm:text-3xl md:text-3xl font-bold text-black dark:text-white">The Story</h4>
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {project.technologies && (
                  <div className="space-y-6 md:space-y-8">
                    <h4 className="text-lg md:text-2xl font-bold uppercase tracking-widest text-gray-400">Stack</h4>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-gray-100 rounded-full text-sm sm:text-base md:text-lg font-bold border border-gray-200 dark:border-white/10 hover:border-[#A87E30] hover:text-[#A87E30] transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-4">
                <div className="bg-black dark:bg-white/10 text-white p-12 rounded-[40px] space-y-8 sticky top-0">
                  <div className="space-y-2">
                    <p className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-widest">Role</p>
                    <p className="text-2xl font-bold">Creative Lead</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-widest">Year</p>
                    <p className="text-2xl font-bold">2024</p>
                  </div>
                  {project.link && (
                    <div className="pt-8">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full bg-[#A87E30] text-white px-10 py-6 rounded-3xl font-bold hover:scale-105 transition-all shadow-2xl"
                      >
                        Visit Site
                        <ArrowUpRight size={24} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div id="projects" className="max-w-[1440px] mx-auto px-4 md:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="space-y-48 md:space-y-80"
      >
        {PROJECTS.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            isEven={idx % 2 === 0}
            onSelect={setSelectedProject}
          />
        ))}
      </motion.div>

      <div className="mt-48 md:mt-80 text-center">
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-16 py-8 border-4 border-black dark:border-white rounded-full font-black text-2xl uppercase tracking-tighter hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 flex items-center gap-6 mx-auto"
        >
          See All Project
          <div className="w-12 h-12 bg-[#A87E30] rounded-full flex items-center justify-center text-white">
            <ArrowUpRight size={32} />
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioSection;
