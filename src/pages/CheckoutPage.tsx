import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InteractiveGadgetButton from '@/components/InteractiveGadgetButton';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast"; // For submission feedback

// Lucide Icons
import { Home, CreditCard, ShieldCheck, User, MapPin, Phone, Mail, Sparkles, Package, Truck } from 'lucide-react';

const addressSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  streetAddress: z.string().min(5, { message: "Street address is required." }),
  apartmentSuite: z.string().optional(),
  city: z.string().min(2, { message: "City is required." }),
  stateProvince: z.string().min(2, { message: "State/Province is required." }),
  zipCode: z.string().min(3, { message: "Valid ZIP/Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  phoneNumber: z.string().optional().refine(val => !val || /^\+?[0-9\s-()]{7,20}$/.test(val), {
    message: "Please enter a valid phone number.",
  }),
});

const paymentSchema = z.object({
  paymentMethod: z.enum(["creditCard", "doraPay", "gadgetWallet"], {
    required_error: "Please select a payment method.",
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVC: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "creditCard") {
    if (!data.cardNumber || !/^\d{13,19}$/.test(data.cardNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardNumber"],
        message: "Valid card number is required (13-19 digits).",
      });
    }
    if (!data.cardExpiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(data.cardExpiry)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardExpiry"],
        message: "Valid expiry date (MM/YY) is required.",
      });
    }
    if (!data.cardCVC || !/^\d{3,4}$/.test(data.cardCVC)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardCVC"],
        message: "Valid CVC (3-4 digits) is required.",
      });
    }
  }
});

const checkoutFormSchema = z.intersection(addressSchema, paymentSchema);

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Sample cart items for summary (in a real app, this would come from state/context)
const sampleCartItems = [
  { id: "1", name: "Magical Dorayaki Pack (x5)", price: 12.50, quantity: 1 },
  { id: "2", name: "Anywhere Door Pizza Slice", price: 5.00, quantity: 2 },
  { id: "3", name: "Memory Bread Loaf", price: 7.75, quantity: 1 },
];
const shippingCost = 3.00;
const subtotal = sampleCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const totalAmount = subtotal + shippingCost;


const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  console.log('CheckoutPage loaded');

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      streetAddress: "",
      apartmentSuite: "",
      city: "",
      stateProvince: "",
      zipCode: "",
      country: "Japan", // Doraemon's origin!
      phoneNumber: "",
      paymentMethod: undefined,
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
    },
  });

  const watchedPaymentMethod = form.watch("paymentMethod");

  function onSubmit(data: CheckoutFormValues) {
    console.log("Checkout form submitted:", data);
    // Simulate API call
    toast({
      title: "Order Processing!",
      description: "Your magical order is being prepared with Doraemon's special touch!",
      duration: 3000,
    });
    setTimeout(() => {
      // In a real app, you'd pass order details to the confirmation page
      navigate('/order-confirmation', { state: { orderDetails: data, cartItems: sampleCartItems, totalAmount } });
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col font-sans">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-3 tracking-tight">
              Checkout Your Treasures!
            </h1>
            <p className="text-lg text-slate-600">
              Almost there! Just a few more details for your <span className="font-semibold text-pink-500">Doraemon Delivery Adventure</span>.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <Card className="shadow-xl border-blue-200 border">
                <CardHeader className="bg-blue-50 p-6 rounded-t-lg">
                  <CardTitle className="text-2xl font-semibold text-blue-700 flex items-center">
                    <Truck className="mr-3 h-7 w-7 text-blue-500" />
                    Delivery Destination
                  </CardTitle>
                  <CardDescription className="text-slate-600">Where should we send your magical goodies?</CardDescription>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-slate-700 font-medium">Full Name (Gadgeteer Name)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Nobita Nobi" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-slate-700 font-medium">Street Address (Time Machine Stop)</FormLabel>
                        <FormControl>
                          <Input placeholder="1-2-3 Future Street" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apartmentSuite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Apartment, Suite, etc. (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Pocket Dimension #4" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">City (Time Zone Central)</FormLabel>
                        <FormControl>
                          <Input placeholder="Neo Tokyo" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stateProvince"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">State / Province</FormLabel>
                        <FormControl>
                          <Input placeholder="Kanto Region DX" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">ZIP / Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="123-4567" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Country (Dimension)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Japan">Japan (21st Century)</SelectItem>
                            <SelectItem value="Future Japan">Japan (22nd Century)</SelectItem>
                            <SelectItem value="Dora-Dimension">Dora-Dimension X</SelectItem>
                            <SelectItem value="Other">Other Friendly Dimension</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Phone (Optional Gadget Line)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+81 90-1234-5678" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-xl border-yellow-300 border">
                <CardHeader className="bg-yellow-50 p-6 rounded-t-lg">
                  <CardTitle className="text-2xl font-semibold text-yellow-700 flex items-center">
                    <CreditCard className="mr-3 h-7 w-7 text-yellow-600" />
                    Magical Payment Method
                  </CardTitle>
                  <CardDescription className="text-slate-600">Choose how you'll sponsor this delicious quest!</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-slate-700 font-medium">Select Payment Option:</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border border-slate-200 rounded-md hover:bg-slate-50 flex-1">
                              <FormControl>
                                <RadioGroupItem value="creditCard" />
                              </FormControl>
                              <FormLabel className="font-normal text-slate-700 cursor-pointer">
                                Credit/Debit Card
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border border-slate-200 rounded-md hover:bg-slate-50 flex-1">
                              <FormControl>
                                <RadioGroupItem value="doraPay" />
                              </FormControl>
                              <FormLabel className="font-normal text-slate-700 cursor-pointer">
                                Dora-Pay™ (Gadget Balance)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border border-slate-200 rounded-md hover:bg-slate-50 flex-1">
                              <FormControl>
                                <RadioGroupItem value="gadgetWallet" />
                              </FormControl>
                              <FormLabel className="font-normal text-slate-700 cursor-pointer">
                                Future Wallet Link
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchedPaymentMethod === 'creditCard' && (
                    <div className="space-y-5 pt-4 border-t border-slate-200">
                       <h3 className="text-lg font-medium text-slate-700">Enter Card Details:</h3>
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="•••• •••• •••• ••••" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-x-6">
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium">Expiry Date (MM/YY)</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cardCVC"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium">CVC/CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="•••" {...field} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  {watchedPaymentMethod === 'doraPay' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-center">
                      <p className="text-blue-700">You've selected Dora-Pay™! Ensure your 4D Pocket has sufficient Dorayaki Coins!</p>
                      <Button variant="link" onClick={() => alert("Connect your Dora-Pay™ account (Not Implemented)")}>Connect Dora-Pay™</Button>
                    </div>
                  )}
                  {watchedPaymentMethod === 'gadgetWallet' && (
                     <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
                      <p className="text-green-700">Future Wallet selected! Get ready for a seamless transaction from the 22nd century!</p>
                       <Button variant="link" onClick={() => alert("Link Future Wallet (Not Implemented)")}>Link Future Wallet</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-xl border-pink-200 border">
                <CardHeader className="bg-pink-50 p-6 rounded-t-lg">
                    <CardTitle className="text-2xl font-semibold text-pink-700 flex items-center">
                        <Package className="mr-3 h-7 w-7 text-pink-500" />
                        Order Summary
                    </CardTitle>
                    <CardDescription className="text-slate-600">A quick peek at your amazing haul!</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                    {sampleCartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-slate-700">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <Separator className="my-3 bg-pink-200" />
                    <div className="flex justify-between items-center text-slate-700">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                        <span>Shipping (Gadget Express):</span>
                        <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <Separator className="my-3 bg-pink-200" />
                    <div className="flex justify-between items-center text-xl font-semibold text-pink-600">
                        <span>Total Adventure Cost:</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                </CardContent>
              </Card>

              <div className="flex flex-col items-center justify-center mt-10 space-y-4">
                 <InteractiveGadgetButton
                    type="submit"
                    gadgetStyle="bell"
                    className="text-xl py-4 px-8 w-full max-w-xs disabled:opacity-60"
                    ariaLabel="Place Magical Order"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Processing..." : (
                        <>
                        Place Your Magical Order!
                        <Sparkles className="inline-block ml-2 h-5 w-5" />
                        </>
                    )}
                </InteractiveGadgetButton>
                <Button variant="link" asChild className="text-slate-600 hover:text-blue-600">
                    <Link to="/cart">Wait, I need to change something in my cart!</Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;