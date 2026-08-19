import { motion } from 'framer-motion';

export function HeroVisual() {
  const pieces = [
    { id: 1, src: '/src/assets/voxel/state-1.png', label: 'LEARN', offset: 'ml-0' },
    { id: 2, src: '/src/assets/voxel/state-2.png', label: 'BUILD', offset: 'ml-12' },
    { id: 3, src: '/src/assets/voxel/state-3.png', label: 'CREATE', offset: '-ml-4' },
    { id: 4, src: '/src/assets/voxel/state-4.png', label: 'GROW', offset: 'ml-8' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full h-[500px] lg:h-[650px] flex flex-col items-center justify-center pt-10 lg:pt-0"
    >
      {pieces.map((piece, index) => (
        <motion.div 
          key={piece.id}
          variants={itemVariants}
          className={`relative flex items-center w-full max-w-[280px] lg:max-w-[320px] ${piece.offset} ${index !== 0 ? '-mt-16 lg:-mt-24' : ''} z-${40 - index * 10}`}
        >
          <motion.img 
            src={piece.src} 
            alt={piece.label}
            className="w-full h-auto drop-shadow-2xl"
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Label & Connector */}
          <div className="absolute left-[85%] lg:left-[95%] top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <div className="w-8 lg:w-16 h-[1px] bg-csl-gold flex-shrink-0"></div>
            <div className="w-2 h-2 rounded-full border border-csl-gold flex-shrink-0 bg-white"></div>
            <span className="ml-4 font-bold text-csl-text tracking-widest text-xs lg:text-sm">
              {piece.label}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
