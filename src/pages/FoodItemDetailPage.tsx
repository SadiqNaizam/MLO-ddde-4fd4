import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Removed useParams as it's not used with static data

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InteractiveGadgetButton from '@/components/InteractiveGadgetButton';

// Shadcn/UI Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"; // For "Add to Cart" feedback

// Icons
import { ShoppingCart, Home, ChefHat } from 'lucide-react';

// Placeholder data for a food item
// In a real app, this would likely come from props or a fetch call using a route parameter (e.g., item ID)
const foodItem = {
  id: 'dora-001',
  name: 'Magical Dorayaki Supreme',
  description: "Doraemon's absolute favorite! Fluffy pancakes filled with sweet red bean paste, enchanted with a sprinkle of wonder.",
  longDescription: "Experience the taste of dreams with our Magical Dorayaki Supreme. Each bite is a journey into a world of sweetness and joy. Made with the finest ingredients and a touch of Doraemon's secret recipe, this dorayaki is not just a snack, it's an adventure! Perfect for sharing with friends or enjoying as a special treat. We use only free-range magic beans for our paste!",
  price: 5.99,
  images: [
    { src: 'https://source.unsplash.com/random/600x400/?pancakes,dessert', alt: 'Delicious Dorayaki Stack' },
    { src: 'https://source.unsplash.com/random/600x400/?sweets,food', alt: 'Close-up of Dorayaki filling' },
    { src: 'https://source.unsplash.com/random/600x400/?japanese,dessert', alt: 'Dorayaki with Doraemon theme decoration' },
  ],
  ingredients: ['Enchanted Flour', 'Free-Range Giggle-Eggs', 'Sparkling Star Sugar', 'Magical Red Bean Paste from the Future', 'A Dash of Joy'],
  nutritionalInfo: 'Calories: approx. 300 per serving. Full of happiness, good vibes, and a sprinkle of 22nd-century innovation!',
  allergenInfo: 'Contains wheat, egg. Prepared in a kitchen that handles nuts and dairy, with utmost care by friendly (and very precise!) robot chefs.',
  preparationTime: 'Approx. 10-15 minutes (with a little help from a Time Furoshiki for speedy delivery!)',
};

const FoodItemDetailPage: React.FC = () => {
  console.log('FoodItemDetailPage loaded');
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${foodItem.name} to cart with instructions: "${specialInstructions}"`);
    toast({
      title: "Hooray! Item Added!",
      description: `${foodItem.name} (x${quantity}) has been magically placed in your Pocket (Cart)!`,
      // variant: "success", // Optional: if you have a success variant defined for toast
    });
    // Optionally reset quantity/instructions or navigate
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-pink-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Section */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center text-blue-600 hover:text-yellow-500 transition-colors">
                  <Home className="mr-2 h-4 w-4" />
                  Doraemon's Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><span>/</span></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/menu" className="flex items-center text-blue-600 hover:text-yellow-500 transition-colors">
                  <ChefHat className="mr-2 h-4 w-4" />
                  Magical Menu
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><span>/</span></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-gray-700">{foodItem.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Image Carousel */}
          <section aria-labelledby="food-item-images" className="bg-white p-3 sm:p-4 rounded-lg shadow-xl border-2 border-yellow-400">
            <h2 id="food-item-images" className="sr-only">Food Item Images</h2>
            {foodItem.images.length > 0 ? (
              <Carousel className="w-full rounded-md overflow-hidden" opts={{ loop: true }}>
                <CarouselContent>
                  {foodItem.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-[4/3] bg-gray-100">
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-sm" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-500 shadow-md border-none" />
                <CarouselNext className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-500 shadow-md border-none" />
              </Carousel>
            ) : (
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center rounded-md">
                <p className="text-gray-500 p-4 text-center">Oh no! Doraemon seems to have misplaced the pictures with his Anywhere Door. We're looking for them!</p>
              </div>
            )}
          </section>

          {/* Right Column: Item Details, Add to Cart */}
          <section aria-labelledby="food-item-details" className="flex flex-col space-y-6 bg-white p-4 sm:p-6 rounded-lg shadow-xl border-2 border-blue-300">
            <div>
              <h1 id="food-item-details" className="text-3xl lg:text-4xl font-bold text-blue-700 mb-2" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                {foodItem.name}
              </h1>
              <p className="text-2xl font-semibold text-orange-500 mb-4">${foodItem.price.toFixed(2)}</p>
              <p className="text-gray-600 text-base leading-relaxed">{foodItem.description}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity" className="block text-sm font-medium text-gray-800 mb-1">How Many Adventures? (Quantity):</Label>
                <Input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-24 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                  aria-label="Item quantity"
                />
              </div>

              <div>
                <Label htmlFor="special-instructions" className="block text-sm font-medium text-gray-800 mb-1">
                  Any Special Wishes for Doraemon? (Instructions):
                </Label>
                <Textarea
                  id="special-instructions"
                  placeholder="e.g., 'Extra magic sprinkles, please!' or 'Tell Nobita I said hi!'"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm min-h-[80px]"
                  rows={3}
                />
              </div>
            </div>

            <InteractiveGadgetButton
              onClick={handleAddToCart}
              gadgetStyle="bell" 
              className="w-full py-3 text-lg font-bold mt-auto"
              ariaLabel={`Add ${foodItem.name} to cart`}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Doraemon's Pocket
            </InteractiveGadgetButton>
          </section>
        </div>

        {/* Accordion for Additional Details */}
        <section className="mt-12 py-6 sm:py-8 bg-white p-4 sm:p-6 rounded-lg shadow-xl border-2 border-pink-300" aria-labelledby="additional-details">
          <h2 id="additional-details" className="text-2xl lg:text-3xl font-semibold text-pink-600 mb-6 text-center" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
            The Secret Scrolls of {foodItem.name}
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="item-1" className="border border-blue-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <AccordionTrigger className="bg-blue-50 hover:bg-blue-100 px-4 py-3 text-blue-700 font-medium text-left text-base sm:text-lg transition-colors">
                A Little More Magic (Full Description)
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700 bg-white text-sm sm:text-base">
                {foodItem.longDescription}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-yellow-300 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <AccordionTrigger className="bg-yellow-50 hover:bg-yellow-100 px-4 py-3 text-yellow-800 font-medium text-left text-base sm:text-lg transition-colors">
                What's Inside This Wonder? (Ingredients)
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700 bg-white text-sm sm:text-base">
                {foodItem.ingredients.join(', ')}. All sourced with a little help from the future!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-green-300 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <AccordionTrigger className="bg-green-50 hover:bg-green-100 px-4 py-3 text-green-800 font-medium text-left text-base sm:text-lg transition-colors">
                Gadget Stats (Nutritional Info)
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700 bg-white text-sm sm:text-base">
                {foodItem.nutritionalInfo}
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4" className="border border-red-300 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <AccordionTrigger className="bg-red-50 hover:bg-red-100 px-4 py-3 text-red-800 font-medium text-left text-base sm:text-lg transition-colors">
                Friendly Warnings (Allergens)
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700 bg-white text-sm sm:text-base">
                {foodItem.allergenInfo}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border border-purple-300 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <AccordionTrigger className="bg-purple-50 hover:bg-purple-100 px-4 py-3 text-purple-800 font-medium text-left text-base sm:text-lg transition-colors">
                Ready in a Flash! (Preparation Time)
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700 bg-white text-sm sm:text-base">
                {foodItem.preparationTime}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FoodItemDetailPage;