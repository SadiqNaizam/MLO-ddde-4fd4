import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InteractiveGadgetButton from '@/components/InteractiveGadgetButton';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

import { Trash2, PlusCircle, MinusCircle, ShoppingBag, ChevronRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const initialCartItems: CartItem[] = [
  { id: '1', name: 'Magical Dorayaki', price: 3.50, quantity: 2, imageUrl: 'https://via.placeholder.com/80x80/FFA500/000000?Text=Dorayaki' },
  { id: '2', name: 'Anywhere Door Pizza Slice', price: 5.00, quantity: 1, imageUrl: 'https://via.placeholder.com/80x80/FF6347/FFFFFF?Text=Pizza' },
  { id: '3', name: 'Memory Bread Toastie', price: 4.25, quantity: 3, imageUrl: 'https://via.placeholder.com/80x80/FFD700/000000?Text=Toast' },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('CartPage loaded');
  }, []);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId, "Item quantity reduced to zero.");
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string, message?: string) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    setCartItems(items => items.filter(item => item.id !== itemId));
    toast({
      title: "Item Removed!",
      description: message || `${itemToRemove?.name || 'Item'} removed from your pocket.`,
      variant: "destructive",
    });
  };

  const calculateItemSubtotal = (item: CartItem) => item.price * item.quantity;

  const cartSubtotal = cartItems.reduce((total, item) => total + calculateItemSubtotal(item), 0);
  const shippingFee = cartItems.length > 0 ? 5.00 : 0; // Example shipping fee
  const totalAmount = cartSubtotal + shippingFee;

  const rowVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center tracking-tight"
        >
          Your Magical Pocket (Cart)
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 bg-white rounded-xl shadow-lg"
          >
            <ShoppingBag className="mx-auto h-24 w-24 text-blue-400 mb-6" strokeWidth={1.5} />
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">Your Pocket is Empty!</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any magical treats yet.</p>
            <InteractiveGadgetButton
              onClick={() => navigate('/menu')}
              gadgetStyle="bell"
              className="text-lg"
            >
              Explore Menu
            </InteractiveGadgetButton>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-xl border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700 flex items-center">
                    <ShoppingBag className="mr-3 h-7 w-7 text-blue-500" />
                    Items in your Adventure
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="w-[100px] pl-6 py-3 text-left text-sm font-semibold text-blue-700">Item</TableHead>
                        <TableHead className="py-3 text-left text-sm font-semibold text-blue-700">Name</TableHead>
                        <TableHead className="text-right py-3 text-sm font-semibold text-blue-700">Price</TableHead>
                        <TableHead className="text-center py-3 text-sm font-semibold text-blue-700 w-[160px]">Quantity</TableHead>
                        <TableHead className="text-right py-3 text-sm font-semibold text-blue-700">Subtotal</TableHead>
                        <TableHead className="text-center pr-6 py-3 text-sm font-semibold text-blue-700">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {cartItems.map(item => (
                          <motion.tr
                            key={item.id}
                            layout
                            variants={rowVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="border-b border-sky-100 hover:bg-sky-50 transition-colors duration-150"
                          >
                            <TableCell className="pl-6 py-4">
                              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                            </TableCell>
                            <TableCell className="font-medium text-gray-800 py-4">{item.name}</TableCell>
                            <TableCell className="text-right text-gray-700 py-4">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-center py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 border-red-300 text-red-500 hover:bg-red-50"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  <MinusCircle className="h-4 w-4" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                  className="w-14 h-8 text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  min="1"
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 border-green-300 text-green-500 hover:bg-green-50"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <PlusCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-semibold text-gray-800 py-4">${calculateItemSubtotal(item).toFixed(2)}</TableCell>
                            <TableCell className="text-center pr-6 py-4">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="shadow-xl sticky top-24 border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-2xl text-blue-700">Adventure Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Magical Delivery Fee:</span>
                    <span className="font-semibold">${shippingFee.toFixed(2)}</span>
                  </div>
                  <hr className="my-2 border-sky-200" />
                  <div className="flex justify-between text-xl font-bold text-blue-600">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <InteractiveGadgetButton
                    onClick={() => navigate('/checkout')}
                    gadgetStyle="anywhere-door"
                    className="w-full text-lg py-3"
                  >
                    Proceed to Checkout
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </InteractiveGadgetButton>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;