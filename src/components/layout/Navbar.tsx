import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const navItems = ['Courses', 'Internships', 'Services', 'Contact'];

export function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 w-full z-50 px-6 py-8 md:px-12 lg:px-24 flex items-center justify-between"
    >
      {/* Left side: Indicator */}
      <div className="flex items-center gap-4">
        <span className="text-csl-blue font-bold tracking-widest text-sm uppercase">CSL / 01</span>
        <div className="w-8 h-[1px] bg-csl-gold/50"></div>
        <div className="w-2 h-2 bg-csl-gold"></div>
      </div>

      {/* Center/Right: Links */}
      <div className="hidden lg:flex items-center gap-12">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="group flex items-center gap-3 text-csl-text font-semibold text-sm hover:text-csl-blue transition-colors">
            {item}
            <span className="w-1.5 h-1.5 bg-csl-gold transition-transform group-hover:scale-125"></span>
          </a>
        ))}
      </div>

      {/* Far Right: CTA */}
      <div className="hidden md:block">
        <a href="#portal" className="group flex items-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-6 py-3 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-csl-blue/20 transition-all duration-300">
          Student Portal
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      
      {/* Mobile Menu Button (Placeholder) */}
      <div className="lg:hidden">
        <button className="text-csl-deep-blue p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </motion.nav>
  );
}
