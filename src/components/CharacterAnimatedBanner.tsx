import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Example if a CTA was needed
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';

// Placeholder data for featured items
const featuredItems = [
  {
    name: 'Magical Dorayaki',
    description: 'Doraemon\'s favorite!',
    imageUrl: 'https://via.placeholder.com/150/FFA500/000000?Text=Dorayaki', // Placeholder image
    characterUrl: 'https://via.placeholder.com/100/0078D7/FFFFFF?Text=Doraemon', // Placeholder character
    characterName: 'Doraemon',
  },
  {
    name: 'Anywhere Door Pizza',
    description: 'A slice of adventure!',
    imageUrl: 'https://via.placeholder.com/150/FF6347/FFFFFF?Text=Pizza', // Placeholder image
    characterUrl: 'https://via.placeholder.com/100/32CD32/FFFFFF?Text=Nobita', // Placeholder character
    characterName: 'Nobita',
  },
  {
    name: 'Memory Bread Toasties',
    description: 'Unforgettably tasty!',
    imageUrl: 'https://via.placeholder.com/150/FFD700/000000?Text=Toast', // Placeholder image
    characterUrl: 'https://via.placeholder.com/100/FFC0CB/000000?Text=Shizuka', // Placeholder character
    characterName: 'Shizuka',
  },
];

const CharacterAnimatedBanner: React.FC = () => {
  console.log('CharacterAnimatedBanner loaded');

  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const characterVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="relative w-full bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 p-8 md:p-12 lg:p-16 overflow-hidden text-center rounded-lg shadow-2xl my-8"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background elements - e.g., subtle gadget patterns or sky */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1, transition: { duration: 1, delay: 0.5 } }}
      ></motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 relative z-10"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
      >
        Welcome to Doraemon's Delicious World!
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-blue-100 mb-8 relative z-10"
      >
        Discover magical treats and unforgettable flavors, presented by your favorite characters!
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10"
        variants={itemVariants}
      >
        {featuredItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <motion.img
              src={item.characterUrl}
              alt={item.characterName}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-3 border-4 border-yellow-400 object-cover"
              variants={characterVariants}
              animate={{
                rotate: [-5, 5, -5],
                transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }}
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{item.description}</p>
            <motion.img
              src={item.imageUrl}
              alt={item.name}
              className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-md mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 + 0.5 } }}
            />
            <Button variant="default" size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-semibold" asChild>
              <Link to="/menu">
                Explore Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-12 relative z-10"
      >
        <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full text-lg" asChild>
          <Link to="/daily-specials">
            <Package className="mr-2 h-5 w-5" />
            Check Out Today's Specials!
          </Link>
        </Button>
      </motion.div>

      {/* Placeholder for more complex character animations across the banner */}
      {/* For example, Doraemon flying across the screen */}
      <motion.div
        className="absolute top-5 right-5 w-24 h-24 md:w-32 md:h-32 z-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { type: "spring", stiffness: 50, delay: 1 } }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
         {/* Imagine Doraemon SVG or Image here */}
        <img src="https://via.placeholder.com/120/0078D7/FFFFFF?Text=DoraemonFlying" alt="Doraemon Flying" className="object-contain"/>
      </motion.div>
    </motion.div>
  );
};

export default CharacterAnimatedBanner;