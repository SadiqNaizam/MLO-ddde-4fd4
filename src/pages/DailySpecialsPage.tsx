import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemedFoodCard from '@/components/ThemedFoodCard';
import InteractiveGadgetButton from '@/components/InteractiveGadgetButton';

// Shadcn/ui Components
import { Textarea } from '@/components/ui/textarea';

// Icons (optional, if needed directly on the page)
import { Sparkles, Lightbulb } from 'lucide-react';

// Placeholder data for special food items
const specialItems = [
  {
    id: 'special-1',
    name: "Time-Warp Tempura",
    price: 15.99,
    imageUrl: 'https://via.placeholder.com/400x300/FFD700/000000?Text=Tempura+Special',
    description: "Crispy tempura that tastes like it's from the best moment in time!",
  },
  {
    id: 'special-2',
    name: "Gadget Bento Box Deluxe",
    price: 22.50,
    imageUrl: 'https://via.placeholder.com/400x300/FA8072/FFFFFF?Text=Bento+Box+Special',
    description: "A surprise bento filled with miniature versions of famous gadget-themed foods.",
  },
  {
    id: 'special-3',
    name: "Future Fruit Parfait",
    price: 12.00,
    imageUrl: 'https://via.placeholder.com/400x300/98FB98/000000?Text=Parfait+Special',
    description: "A vibrant parfait with fruits not yet discovered by humankind... until now!",
  },
   {
    id: 'special-4',
    name: "Memory Bread Pudding",
    price: 9.75,
    imageUrl: 'https://via.placeholder.com/400x300/ADD8E6/000000?Text=Pudding+Special',
    description: "A warm, comforting bread pudding that will bring back your tastiest memories.",
  },
];

const DailySpecialsPage: React.FC = () => {
  console.log('DailySpecialsPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 pattern-dots pattern-blue-200 pattern-bg-sky-50 pattern-opacity-20 pattern-size-4">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title Section */}
        <section className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-3"
            style={{ textShadow: '2px 2px 4px rgba(0,123,255,0.2)' }}
          >
            <Sparkles className="inline-block h-10 w-10 mr-2 text-yellow-400 -mt-2" />
            Today's Magical Specials!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Unveiled by Doraemon's fantastic Time Kerchief! These delightful dishes are available for a limited time. Don't miss out on these unique flavors!
          </motion.p>
        </section>

        {/* Special Items Grid */}
        {specialItems.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-16">
            {specialItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3, ease: "easeOut" }}
              >
                <ThemedFoodCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  // description={item.description} // ThemedFoodCard does not currently take description. It's used above.
                />
              </motion.div>
            ))}
          </section>
        ) : (
          <section className="text-center py-12">
            <img src="https://via.placeholder.com/150/CCCCCC/FFFFFF?Text=Empty+Pocket" alt="No specials today" className="mx-auto mb-4 h-32 w-32 opacity-50"/>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Oops! No Specials Today!</h2>
            <p className="text-gray-500 mb-6">
              Doraemon is busy inventing new magical dishes. Please check back soon or explore our <Link to="/menu" className="text-blue-500 hover:underline font-semibold">Main Menu</Link>!
            </p>
          </section>
        )}


        {/* Suggest a Special Section */}
        <section className="mb-12 p-6 sm:p-8 bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-100 rounded-xl shadow-xl border-2 border-yellow-400 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center md:space-x-6">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <Lightbulb className="h-16 w-16 text-yellow-500 opacity-80" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-700 mb-3">
                Got a Delicious Dream?
              </h2>
              <p className="text-amber-600 mb-5 text-sm sm:text-base">
                What magical dish would you love to see as a special? Share your ideas with Doraemon's kitchen!
              </p>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Suggestion submitted (not really, this is a demo)!"); }}>
            <div className="space-y-4">
              <Textarea
                placeholder="Describe your dream dish... perhaps a 'Fly-High Pizza' or 'Small Light Noodles'?"
                rows={4}
                className="bg-white focus:ring-yellow-500 focus:border-yellow-500 border-gray-300"
                aria-label="Suggest a special dish"
              />
              <InteractiveGadgetButton
                type="submit"
                gadgetStyle="bell"
                className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-bold"
                ariaLabel="Submit your special dish suggestion"
              >
                Send My Magical Idea!
              </InteractiveGadgetButton>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Adding motion for animation, assuming framer-motion is available as per CharacterAnimatedBanner
// If not, these would be static. For mlo, we assume dependencies exist.
// We will import motion if it's not globally available
// However, the prompt says PageTransitionLoader has framer-motion, so it should be available.
// For robust code, let's add the import.
import { motion } from 'framer-motion';

export default DailySpecialsPage;