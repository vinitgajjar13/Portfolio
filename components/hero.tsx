
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Apple, ChartColumn, Layers3, MoveRight } from 'lucide-react';
import vinit_hero from "../assets/vinit.png";

interface HeroProps {
  onOpenContact?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vinit-karshala-953a01229/' },
    { label: 'GitHub', href: 'https://github.com/vinitgajjar13' },
    // { label: 'Instagram', href: 'https://www.instagram.com/ganzattux?igsh=bWl4cjQ0Y3V0dTFq' },
  ];

  // const capabilities = [
  //   {
  //     icon: Apple,
  //     title: 'Appstore-style polish',
  //     description: 'Clean visual hierarchy and crisp presentation for product-facing work.',
  //   },
  //   {
  //     icon: Layers3,
  //     title: 'Design systems',
  //     description: 'Structured components and consistent spacing across screens.',
  //   },
  //   {
  //     icon: ChartColumn,
  //     title: 'Conversion focus',
  //     description: 'Interfaces shaped to make the next action obvious and frictionless.',
  //   },
  //   {
  //     icon: MoveRight,
  //     title: 'Front-end delivery',
  //     description: 'Motion, responsiveness, and implementation details that stay light.',
  //   },
  // ];

  return (
    <section className="relative overflow-hidden bg-white px-4 pb-16 pt-24 text-[#111111] sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[#f7f4ee] blur-3xl sm:h-[32rem] sm:w-[32rem] lg:h-[40rem] lg:w-[40rem]" />
        <div className="absolute inset-x-0 top-0 h-px bg-black/5" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:min-h-[calc(100vh-5rem)] lg:justify-between lg:gap-14">

        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left"
          >
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.26em] text-black/45 sm:mb-6 sm:text-sm sm:tracking-[0.28em]">
              Designer, developer, and product-focused maker
            </p>

            <h1 className="mx-auto max-w-[13ch] text-[clamp(2.5rem,9vw,4.6rem)] font-medium leading-[0.96] tracking-[-0.07em] text-black lg:mx-0 lg:max-w-[12ch] lg:text-6xl xl:text-[4.6rem]">
              Vinit Karshala designs modern digital products with a calm, minimal feel.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-black/55 sm:mt-6 sm:text-base lg:mx-0 lg:max-w-lg">
              UI/UX design, clean front-end execution, and thoughtful motion for brands
              that want a polished presence without visual noise.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-sm text-black/65 lg:justify-start">
              <a href="#projects" className="inline-flex items-center gap-2 transition-colors hover:text-black">
                View work <ArrowUpRight size={16} />
              </a>
              <span className="hidden h-px w-10 bg-black/15 sm:block" />
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 lg:justify-start">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-black"
                  >
                    {link.label}
                    {index < socialLinks.length - 1 ? ' —' : ''}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-first lg:order-none"
          >
            <div className="relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-[1.75rem] shadow-[0_22px_60px_rgba(15,15,15,0.08)] sm:max-w-[28rem] sm:rounded-[2rem] md:max-w-[34rem] lg:ml-auto lg:max-w-[38rem] lg:rounded-[2.5rem]">
              <div className="aspect-[4/5] w-full" />
              <motion.img
                src={vinit_hero}
                alt="Vinit Karshala portrait"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover object-[30%_center]"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/55 to-transparent" />

              <div className="absolute left-4 top-4 rounded-full border border-black/10 bg-white/85 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-black/55 backdrop-blur sm:left-6 sm:top-6 sm:text-[0.68rem] sm:tracking-[0.28em]">
                Available for work
              </div>
            </div>
          </motion.div>
        </div>

        {/* <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.06, duration: 0.7 }}
                className="rounded-[1.75rem] border border-black/8 bg-white p-5 shadow-[0_16px_50px_rgba(15,15,15,0.04)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-[#f6f2ea] text-black">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-base font-medium text-black">{item.title}</h2>
                    <p className="text-sm leading-6 text-black/55">{item.description}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
