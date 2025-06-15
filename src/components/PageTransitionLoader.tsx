import React from 'react';
import { motion } from 'framer-motion';
import { PocketIcon } from 'lucide-react';

const PageTransitionLoader: React.FC = () => {
  console.log('PageTransitionLoader loaded');

  // Variants for the main screen wipe animation
  const wipeVariants = {
    hidden: { y: '-100%' },
    visible: { y: '0%', transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { y: '100%', transition: { duration: 0.4, ease: 'easeInOut', delay: 0.3 } }, // Delay exit to allow content to fade
  };

  // Variants for the content (icon, text, dots)
  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2, duration: 0.3, ease: 'easeOut' }, // Content appears after wipe starts
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: 'easeIn' }, // Content fades out before wipe fully exits
    },
  };

  // Variants for the bouncing dots container to stagger children
  const dotsContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for individual bouncing dots
  const dotVariants = {
    hidden: { y:0, opacity: 0 },
    visible: {
      y: [0, -10, 0],
      opacity: 1,
      transition: {
        y: {
            repeat: Infinity,
            duration: 0.8,
            ease: 'easeInOut',
        },
        opacity: { duration: 0.1 } // Quick fade in for dots
      },
    },
    exit: {
        opacity: 0,
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sky-500 overflow-hidden" // Doraemon's primary blue
      variants={wipeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-live="assertive"
      aria-label="Loading next page content"
    >
      <motion.div
        className="flex flex-col items-center justify-center text-white"
        variants={contentVariants}
      >
        <motion.div
          className="mb-6" // Increased margin
          animate={{ rotate: [0, 15, -10, 15, 0], scale: [1, 1.1, 1, 1.1, 1] }} // More playful wiggle/pulse
          transition={{
            rotate: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
          }}
        >
          <PocketIcon className="h-24 w-24 text-white" strokeWidth={1.5} /> {/* Larger icon */}
        </motion.div>
        <motion.p
          className="text-3xl font-semibold mb-6" // Larger text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          exit={{ opacity: 0 }}
        >
          Loading Adventure...
        </motion.p>
        <motion.div
          className="flex space-x-2"
          variants={dotsContainerVariants}
          // initial, animate, exit inherited
        >
          <motion.div className="h-3.5 w-3.5 bg-yellow-300 rounded-full" variants={dotVariants} />
          <motion.div className="h-3.5 w-3.5 bg-red-500 rounded-full" variants={dotVariants} />
          <motion.div className="h-3.5 w-3.5 bg-white rounded-full" variants={dotVariants} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PageTransitionLoader;