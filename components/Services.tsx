
import React from 'react';
import { MoveRight } from 'lucide-react';
import { SERVICES } from '../constants';
import ScrollFloat from './ScrollFloat';

const Services: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
        {/* Left Column Label */}
        <div className="flex items-start gap-3 sm:gap-4 pb-8 md:pb-0 flex-col sm:flex-row">
          <h3 className="text-2xl sm:text-3xl md:text-3xl font-medium text-black dark:text-white">What I do</h3>
          <div className="w-8 h-8 sm:w-10 sm:h-10 border border-black dark:border-white rounded-full flex items-center justify-center -rotate-45 text-black dark:text-white flex-shrink-0">
            <MoveRight size={18} className="sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Services Grid (spanning 2 columns) */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-16">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="space-y-3 sm:space-y-4 border-l-2 border-black dark:border-white/20 pl-4 sm:pl-6 group">
              <h4 className="text-xl sm:text-2xl md:text-2xl font-bold text-black dark:text-white group-hover:text-[#A87E30] transition-colors">
                <ScrollFloat animationDuration={0.8} ease='backOut'>
                  {service.title}
                </ScrollFloat>
              </h4>
              <div className="text-sm sm:text-base md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                <ScrollFloat animationDuration={1} ease={[0.22, 1, 0.36, 1]} stagger={0.02}>
                  {service.description}
                </ScrollFloat>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
