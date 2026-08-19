import { ArrowRight, ArrowDown } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { Navbar } from '../layout/Navbar';
import { LiquidDistortion } from '../effects/LiquidDistortion';

export function Hero() {
  return (
    <div className="relative min-h-screen bg-csl-bg overflow-hidden flex flex-col 2xl:items-center">
      <LiquidDistortion />
      
      <Navbar />

      {/* Filtered Layer: Background Squares, Logo, Text, Buttons */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'url(#liquid-glass)' }}>
        
        {/* Animated Background Cubes */}
        <div className="absolute inset-0 overflow-hidden 2xl:max-w-[1600px] 2xl:mx-auto">
          {/* Soft Glows */}
          <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-csl-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-csl-blue/5 rounded-full blur-3xl"></div>
          
          <div className="absolute top-[60%] left-[25%] w-24 h-24" style={{ backgroundImage: 'radial-gradient(circle, #F5B83D 1px, transparent 1px)', backgroundSize: '12px 12px', opacity: 0.3 }}></div>
          <div className="absolute top-[15%] right-[5%] w-32 h-32" style={{ backgroundImage: 'radial-gradient(circle, #1455B8 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.1 }}></div>

          {/* Editorial Grid: Yellow Background Geometry (8-12 blocks) */}
          <div data-distort="square" className="absolute top-[12%] left-[35%] w-3 h-3 bg-csl-gold/80" />
          <div data-distort="square" className="absolute top-[22%] left-[48%] w-16 h-16 bg-csl-gold/90 shadow-sm" />
          <div data-distort="square" className="absolute top-[45%] left-[42%] w-6 h-6 border-[1.5px] border-csl-gold/70" />
          <div data-distort="square" className="absolute bottom-[28%] left-[28%] w-20 h-32 bg-csl-light-gold/60 mix-blend-multiply" />
          <div data-distort="square" className="absolute bottom-[18%] left-[45%] w-4 h-4 bg-csl-gold/90" />
          <div data-distort="square" className="absolute top-[18%] right-[55%] w-24 h-24 bg-csl-gold/10 border border-csl-gold/30 backdrop-blur-sm" />
          <div data-distort="square" className="absolute top-[35%] right-[48%] w-2 h-2 bg-csl-gold/80" />
          <div data-distort="square" className="absolute bottom-[40%] right-[52%] w-10 h-10 border-[1.5px] border-csl-gold/50" />
          <div data-distort="square" className="absolute bottom-[15%] right-[42%] w-14 h-14 bg-csl-gold/80 shadow-sm" />
          <div data-distort="square" className="absolute top-[8%] left-[60%] w-8 h-8 bg-csl-gold/40" />
        </div>

        {/* Content Container (Positioned absolutely to match layout) */}
        <main className="absolute inset-0 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center pt-24 lg:pt-0 pb-12 lg:pb-0 pointer-events-none">
          
          {/* Scroll To Explore */}
          <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4">
            <div className="h-16 w-[1px] bg-csl-blue/30"></div>
            <span className="text-csl-blue font-bold tracking-widest text-[10px] uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Scroll To Explore
            </span>
            <ArrowDown className="w-4 h-4 text-csl-blue" />
          </div>

          {/* Left Content (Text) */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center h-full xl:pl-12 pointer-events-auto relative z-20">
            <div className="mb-2" data-distort="logo">
              <img src="/src/assets/brand/csl-book.png" alt="CSL Logo" className="w-16 h-auto md:w-20 lg:w-24 object-contain" />
            </div>

            <h1 data-distort="text" className="text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-csl-text leading-[1.05] tracking-tight mb-4">
              Creator<br />Space<br />Labs
            </h1>
            
            <h2 data-distort="text" className="text-lg md:text-xl lg:text-2xl italic font-semibold text-csl-text mb-5 tracking-wide">
              Driving Innovation<br />Through Partnership
            </h2>
            
            <p className="text-sm md:text-base text-csl-muted max-w-[360px] leading-relaxed mb-8">
              From your first line of code to your<br className="hidden md:block"/>
              first job offer — we're with you<br className="hidden md:block"/>
              at every step.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#learn" data-distort="button" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-csl-gold text-csl-text px-6 py-3 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-csl-gold/20 hover:-translate-y-0.5 transition-all duration-300">
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#portal" data-distort="button" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-csl-deep-blue text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-csl-blue hover:shadow-lg hover:shadow-csl-blue/20 hover:-translate-y-0.5 transition-all duration-300">
                Go to Student Portal
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </main>
      </div>

      {/* Unfiltered Layer: Right Content (Visual) */}
      <main className="flex-1 relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-end pt-24 lg:pt-0 pb-12 lg:pb-0 pointer-events-none">
        <div className="w-full lg:w-[50%] flex items-center justify-center mt-12 lg:mt-0 relative pointer-events-auto">
          <HeroVisual />
        </div>
      </main>

    </div>
  );
}
