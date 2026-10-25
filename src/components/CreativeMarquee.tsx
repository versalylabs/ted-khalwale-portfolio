import React from 'react';

export const CreativeMarquee: React.FC = () => {
  const marqueeItems = [
    'TED KHALWALE',
    'MODERN WEBSITES',
    'BUSINESS MANAGEMENT SYSTEMS',
    'CUSTOM WEB APPLICATIONS',
    'INTERACTIVE DASHBOARDS',
    'REACT & NEXT.JS',
    'CLEAN CODE ARCHITECTURE',
    'SCALABLE FULL-STACK',
  ];

  return (
    <div className="relative w-full py-3.5 overflow-hidden border-y border-slate-200/80 bg-slate-100/60 backdrop-blur-sm">
      {/* Edge gradient fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#fafafc] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#fafafc] to-transparent z-10" />

      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* Loop set 1 */}
        {marqueeItems.map((item, idx) => (
          <div key={`m1-${idx}`} className="flex items-center gap-8">
            <span className="text-xs font-bold tracking-widest uppercase text-slate-700 hover:text-slate-950 transition-colors">
              {item}
            </span>
            <span className="text-indigo-600 text-xs">✦</span>
          </div>
        ))}

        {/* Loop set 2 */}
        {marqueeItems.map((item, idx) => (
          <div key={`m2-${idx}`} className="flex items-center gap-8">
            <span className="text-xs font-bold tracking-widest uppercase text-slate-700 hover:text-slate-950 transition-colors">
              {item}
            </span>
            <span className="text-indigo-600 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
