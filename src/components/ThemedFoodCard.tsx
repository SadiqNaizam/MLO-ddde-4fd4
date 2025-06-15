import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

// Assuming InteractiveGadgetButton component exists and can be imported
// If its path is different, this import will need adjustment.
import InteractiveGadgetButton from '@/components/InteractiveGadgetButton';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface ThemedFoodCardProps extends FoodItem {}

const ThemedFoodCard: React.FC<ThemedFoodCardProps> = ({ id, name, price, imageUrl }) => {
  const { toast } = useToast();
  console.log('ThemedFoodCard loaded for:', name);

  const handleAddToCart = () => {
    const itemToAdd = { id, name, price, imageUrl };
    // In a real app, you'd dispatch an action to add to cart state
    console.log('Adding to cart:', itemToAdd);
    toast({
      title: "Added to Pocket!",
      description: `${name} has been added to your adventure bag (cart).`,
      // Potentially add a themed icon or action here if toast supports it
    });
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        rotate: [0, -1, 1, -1, 0], // Wiggle effect
        transition: { duration: 0.4, ease: "easeInOut" },
      }}
      className="w-full"
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col bg-gradient-to-br from-sky-100 via-blue-50 to-sky-100 border-blue-300 border-2">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={4 / 3}>
            <img
              src={imageUrl || 'https://doraemon-asset.fandom.com/id/images/2/2c/Doraemon_New_Pose.png'} // Placeholder Doraemon image
              alt={name}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          {/* Small character interaction idea:
              Could absolutely position a small animated Doraemon icon here on hover,
              but that requires more complex setup (e.g. another motion.div with visibility toggled on hover)
              For now, the wiggle serves as the primary playful animation.
          */}
        </CardHeader>

        <CardContent className="p-4 flex-grow space-y-2 bg-white">
          <CardTitle className="text-xl font-bold text-blue-700 line-clamp-2">{name}</CardTitle>
          <p className="text-lg font-semibold text-orange-500">${price.toFixed(2)}</p>
        </CardContent>

        <CardFooter className="p-3 bg-blue-100 border-t border-blue-200">
          {/*
            Assuming InteractiveGadgetButton takes onClick and children.
            It might have other props for styling (e.g., 'gadget="bell"').
            Adjust props as per actual InteractiveGadgetButton implementation.
          */}
          <InteractiveGadgetButton
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold"
            // Example of passing children if the button supports it
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </InteractiveGadgetButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ThemedFoodCard;