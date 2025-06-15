import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CharacterAnimatedBanner from '@/components/CharacterAnimatedBanner';
import ThemedFoodCard from '@/components/ThemedFoodCard';
import InteractiveGadgetButton from '@/components/InteractiveGadgetButton';

// Icons
import { DoorOpen, ShoppingBag } from 'lucide-react';

// Placeholder data for bestselling food items
const bestsellingItems = [
  {
    id: 'dora001',
    name: "Doraemon's Favorite Dorayaki (3-Pack)",
    price: 7.99,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0h7gB0LwU7vWnQXz_j1g9eYtO_q8Rz7tU8A&s', // Placeholder
  },
  {
    id: 'nob002',
    name: "Memory Bread French Toast",
    price: 9.50,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hD7d0W-1Z2mFpS_xO8nJkY6Lq0bU9P4r8A&s', // Placeholder
  },
  {
    id: 'shi003',
    name: "Shizuka's Sweet Potato Delight",
    price: 6.75,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QvGj7c8Xo3zK5P9sN_aL1Y6JdI2Bv4nC9A&s', // Placeholder
  },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-sky-200 font-sans">
      <Header />

      <main className="flex-grow">
        {/* Character Animated Banner Section - Showcases featured items */}
        <CharacterAnimatedBanner />

        {/* Bestselling Food Items Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-10 md:mb-12 flex items-center justify-center">
              <ShoppingBag className="mr-3 h-8 w-8 text-yellow-500" />
              Our Magical Bestsellers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestsellingItems.map((item) => (
                <ThemedFoodCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 md:py-20 bg-sky-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
              Ready for a Flavor Adventure?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
              Step through the Anywhere Door and explore our full menu, filled with delightful surprises and Doraemon's favorite treats!
            </p>
            <Link to="/menu"> {/* Path from App.tsx */}
              <InteractiveGadgetButton
                gadgetStyle="anywhere-door"
                className="text-lg py-3 px-8"
                ariaLabel="Explore Full Menu"
              >
                <DoorOpen className="mr-2 h-6 w-6" />
                Explore Full Menu
              </InteractiveGadgetButton>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Homepage;