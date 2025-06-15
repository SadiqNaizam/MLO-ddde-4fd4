import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCategoryIntroProps {
  categoryName: string;
  doraemonImageUrl: string; // e.g., '/images/doraemon-posing.png'
  itemImageUrl: string;     // e.g., '/images/dorayaki.png'
  itemAltText?: string;
  backgroundColor?: string; // Optional: to customize background color
}

const AnimatedCategoryIntro: React.FC<AnimatedCategoryIntroProps> = ({
  categoryName,
  doraemonImageUrl = 'https://via.placeholder.com/256/009EE3/FFFFFF?Text=Doraemon', // Default placeholder
  itemImageUrl = 'https://via.placeholder.com/128/FFCC00/000000?Text=Item',       // Default placeholder
  itemAltText,
  backgroundColor = 'bg-blue-100', // Doraemon-themed light blue
}) => {
  console.log(`AnimatedCategoryIntro loaded for category: ${categoryName}`);

  const doraVariant = {
    initial: { y: 0 },
    animate: {
      y: [-4, 4, -4],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const itemVariant = {
    initial: { opacity: 0, scale: 0.3, x: "-50%", y: "100%" }, // Start from below pocket, scaled down
    animate: {
      opacity: 1,
      scale: 1,
      y: "0%", // Moves up to position
      x: "-50%",
      transition: {
        duration: 0.8,
        ease: 'backOut', // Playful bounce
        delay: 0.3,
      },
    },
  };

  const titleVariant = {
    initial: { opacity: 0, x: 30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.7, // After item appears
      },
    },
  };

  return (
    <div className={`relative w-full p-6 md:p-8 rounded-xl shadow-xl overflow-hidden ${backgroundColor}`}>
      <div className="flex flex-col md:flex-row items-center justify-around">
        {/* Doraemon Character */}
        <motion.div
          className="relative z-10 mb-4 md:mb-0"
          variants={doraVariant}
          initial="initial"
          animate="animate"
        >
          <img
            src={doraemonImageUrl}
            alt="Doraemon"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain"
          />
          {/* Pocket area visual cue - item will animate from here */}
          {/* The item's initial position and animation path should align with this pocket area. */}
          {/* For this example, we assume pocket is roughly center-bottom of Doraemon's image. */}
          {/* Item's animation (itemVariant) places it relative to this conceptual pocket */}
          <motion.div
            className="absolute left-1/2 top-[70%] z-20" // Positioned to appear from Doraemon's pocket area
            variants={itemVariant}
            initial="initial"
            animate="animate"
          >
            <img
              src={itemImageUrl}
              alt={itemAltText || `Icon for ${categoryName}`}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Category Title */}
        <motion.div
          className="relative z-30 text-center md:text-left md:pl-8"
          variants={titleVariant}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-1">
            {categoryName}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Discover our amazing {categoryName.toLowerCase()}!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedCategoryIntro;