import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InteractiveGadgetButton from '@/components/InteractiveGadgetButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Sparkles, ShoppingBag } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  console.log('OrderConfirmationPage loaded');

  const location = useLocation();
  // Attempt to get order details from route state, or use placeholders
  const orderDetails = location.state?.orderDetails || {
    id: 'DORA' + Math.floor(Math.random() * 89999 + 10000), // Generates a 5-digit random number
    items: [
      { name: 'Magical Dorayaki', quantity: 2, price: 5.00 },
      { name: 'Anywhere Door Pizza', quantity: 1, price: 15.00 },
      { name: 'Memory Bread Toasties', quantity: 3, price: 3.50 },
    ],
    total: (2 * 5.00) + (1 * 15.00) + (3 * 3.50), // Calculated total
    estimatedDelivery: 'approx. 30 minutes (via Time Furoshiki Express!)',
    customerName: location.state?.customerName || 'Adventurer', // Placeholder name
  };

  const totalItems = orderDetails.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-pink-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-2xl"
        >
          <Card className="shadow-2xl rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-yellow-400">
            <CardHeader className="bg-yellow-400 p-6 text-center relative overflow-hidden">
              {/* Subtle background sparkle animation */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white"
                  initial={{ opacity: 0, scale:0.5 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], rotate: Math.random() * 360 }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 1 }}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                >
                  <Sparkles size={Math.random() * 20 + 10} />
                </motion.div>
              ))}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 10 }}
                className="inline-block mb-3 relative z-10"
              >
                <CheckCircle2 className="h-16 w-16 md:h-20 md:w-20 text-green-600 bg-white rounded-full p-2 shadow-lg" />
              </motion.div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-blue-700 relative z-10">
                Order Confirmed!
              </CardTitle>
              <CardDescription className="text-blue-600 text-lg mt-1 relative z-10">
                Your delicious adventure is on its way, {orderDetails.customerName}!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-700">
                  Doraemon and the gang are preparing your magical treats with extra joy!
                </p>
              </div>

              <div className="border-t border-b border-gray-200 py-4 space-y-3 bg-blue-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-blue-600 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 mr-2 text-orange-500" />
                  Order Summary
                </h3>
                <p className="text-sm text-gray-600 text-center">Order ID: #{orderDetails.id}</p>
                
                <ul className="space-y-1 text-gray-700">
                  {orderDetails.items.map(item => (
                    <li key={item.name} className="flex justify-between items-center text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <p className="flex justify-between items-center text-lg font-bold text-orange-600">
                    <span>Total:</span>
                    <span>${orderDetails.total.toFixed(2)}</span>
                  </p>
                </div>
                 <p className="text-sm text-gray-700 text-center mt-2">
                  <strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}
                </p>
              </div>
              
              <div className="text-center mt-8">
                <motion.img 
                  src="https://imagetolink.com/ib/5206l8rR1A.png" // Doraemon & Dorami celebrating
                  alt="Doraemon and Dorami celebrating your order"
                  className="mx-auto h-32 md:h-40 w-auto mb-4"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/200x150/009EE3/FFFFFF?Text=Doraemon+Yay!';
                    e.currentTarget.alt = 'Doraemon happy illustration';
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
                <p className="text-md text-gray-600 mb-6">
                  We hope you enjoy your meal! Explore more of Doraemon's world while you wait.
                </p>
                <InteractiveGadgetButton
                  gadgetStyle="anywhere-door"
                  className="text-base md:text-lg px-6 py-3 md:px-8"
                  ariaLabel="Continue to Menu"
                >
                  <Link to="/menu" className="flex items-center">
                    Browse More Magical Items
                  </Link>
                </InteractiveGadgetButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;