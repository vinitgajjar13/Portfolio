
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
    { label: 'Instagram', href: 'https://www.instagram.com/ganzattux?igsh=bWl4cjQ0Y3V0dTFq' },
  ];

  const capabilities = [
    {
      icon: Apple,
      title: 'Appstore-style polish',
      description: 'Clean visual hierarchy and crisp presentation for product-facing work.',
    },
    {
      icon: Layers3,
      title: 'Design systems',
      description: 'Structured components and consistent spacing across screens.',
    },
    {
      icon: ChartColumn,
      title: 'Conversion focus',
      description: 'Interfaces shaped to make the next action obvious and frictionless.',
    },
    {
      icon: MoveRight,
      title: 'Front-end delivery',
      description: 'Motion, responsiveness, and implementation details that stay light.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 pb-20 pt-32 text-[#111111] sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[#f7f4ee] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-black/5" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-between gap-14 lg:min-h-[calc(100vh-5rem)]">

        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.28em] text-black/45">
              Designer, developer, and product-focused maker
            </p>

            <h1 className="max-w-[12ch] text-4xl font-medium leading-[0.98] tracking-[-0.07em] text-black sm:text-5xl lg:text-6xl xl:text-[4.6rem]">
              Vinit Karshala designs modern digital products with a calm, minimal feel.
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-black/55 sm:text-base">
              UI/UX design, clean front-end execution, and thoughtful motion for brands
              that want a polished presence without visual noise.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-black/65">
              <a href="#projects" className="inline-flex items-center gap-2 transition-colors hover:text-black">
                View work <ArrowUpRight size={16} />
              </a>
              <span className="hidden h-px w-10 bg-black/15 sm:block" />
              <div className="flex flex-wrap gap-x-4 gap-y-2">
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
            className="relative"
          >
            <div className="relative ml-auto w-full max-w-[42rem] overflow-hidden rounded-[2.5rem] bg-[#f7f7f7] shadow-[0_30px_90px_rgba(15,15,15,0.08)]">
              <motion.img
                src={vinit_hero}
                alt="Vinit Karshala portrait"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-[28rem] w-full object-cover object-[30%_center] grayscale sm:h-[34rem] lg:h-[38rem]"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/55 to-transparent" />

              <div className="absolute left-6 top-6 rounded-full border border-black/10 bg-white/85 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-black/55 backdrop-blur">
                Selected portrait
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
