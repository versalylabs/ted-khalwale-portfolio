import React from 'react';

export const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft Ambient Pastel Glow 1: Top Right */}
      <div 
        className="absolute -top-32 right-[-10%] w-[500px] h-[500px] rounded-full blur-[140px] bg-gradient-to-br from-indigo-100/60 via-purple-100/40 to-transparent opacity-70"
      />

      {/* Soft Ambient Pastel Glow 2: Center Left */}
      <div 
        className="absolute top-[35%] -left-32 w-[480px] h-[480px] rounded-full blur-[140px] bg-gradient-to-tr from-blue-100/50 via-slate-100/60 to-transparent opacity-60"
      />

      {/* Soft Ambient Pastel Glow 3: Bottom Right */}
      <div 
        className="absolute bottom-10 -right-20 w-[520px] h-[520px] rounded-full blur-[150px] bg-gradient-to-tl from-indigo-100/40 via-sky-100/40 to-transparent opacity-60"
      />

      {/* Subtle Micro Dot Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
};
