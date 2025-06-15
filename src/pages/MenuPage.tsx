import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedCategoryIntro from '@/components/AnimatedCategoryIntro';
import ThemedFoodCard from '@/components/ThemedFoodCard';
import InteractiveGadgetButton from '@/components/InteractiveGadgetButton';

// shadcn/ui Components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sparkles } from 'lucide-react';

// Sample Data for Food Items
const foodCategories = [
  {
    name: "Magical Mains",
    doraemonImageUrl: "https://doraemon-asset.fandom.com/id/images/d/d8/Doraemon_New_Pose_3.png", // More dynamic pose
    itemImageUrl: "https://via.placeholder.com/150/FFA500/000000?Text=DorayakiLarge",
    itemAltText: "A large, delicious Dorayaki",
    backgroundColor: "bg-gradient-to-br from-blue-200 via-sky-100 to-blue-200",
    items: [
      { id: 'm1', name: "Doraemon's Favorite Dorayaki Platter", price: 12.99, imageUrl: 'https://via.placeholder.com/350/FFA500/000000?Text=Dorayaki+Platter' },
      { id: 'm2', name: "Nobita's 'Zero Test Score' Energy Noodles", price: 9.50, imageUrl: 'https://via.placeholder.com/350/F0E68C/000000?Text=Energy+Noodles' },
      { id: 'm3', name: "Gian's 'Mighty Voice' Mega Burger", price: 15.00, imageUrl: 'https://via.placeholder.com/350/FF6347/FFFFFF?Text=Mega+Burger' },
      { id: 'm4', name: "Suneo's 'Rich Flavor' Ramen", price: 13.50, imageUrl: 'https://via.placeholder.com/350/FFDEAD/000000?Text=Deluxe+Ramen' },
    ]
  },
  {
    name: "Gadget Sides & Snacks",
    doraemonImageUrl: "https://doraemon-asset.fandom.com/th/images/9/96/Doraemon_new_event_icon.png", // Pocket pose
    itemImageUrl: "https://via.placeholder.com/150/FFD700/000000?Text=MemoryBread",
    itemAltText: "A slice of Memory Bread",
    backgroundColor: "bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-100",
    items: [
      { id: 's1', name: "Small Light Potatoes", price: 4.99, imageUrl: 'https://via.placeholder.com/350/D2B48C/000000?Text=Small+Light+Potatoes' },
      { id: 's2', name: "Memory Bread Croutons Salad", price: 6.50, imageUrl: 'https://via.placeholder.com/350/90EE90/000000?Text=Memory+Bread+Salad' },
      { id: 's3', name: "Take-Copter Tempura Twirls", price: 7.25, imageUrl: 'https://via.placeholder.com/350/ADD8E6/000000?Text=Tempura+Twirls' },
    ]
  },
  {
    name: "Sweet Surprises",
    doraemonImageUrl: "https://doraemon-asset.fandom.com/id/images/a/a5/Doraemon_Run.png", // Happy/Running pose
    itemImageUrl: "https://via.placeholder.com/150/FFC0CB/000000?Text=SweetTreat",
    itemAltText: "A delightful sweet treat",
    backgroundColor: "bg-gradient-to-br from-pink-100 via-red-50 to-pink-100",
    items: [
      { id: 'd1', name: "Anywhere Door Mini-Cakes (Set of 3)", price: 7.00, imageUrl: 'https://via.placeholder.com/350/FFB6C1/000000?Text=Mini+Cakes' },
      { id: 'd2', name: "Time Kerchief Tiramisu Cup", price: 8.50, imageUrl: 'https://via.placeholder.com/350/A0522D/FFFFFF?Text=Tiramisu+Cup' },
      { id: 'd3', name: "Shizuka's Sweet Potato Pie Slice", price: 6.75, imageUrl: 'https://via.placeholder.com/350/E6E6FA/000000?Text=Sweet+Potato+Pie' },
    ]
  }
];

const MenuPage: React.FC = () => {
  console.log('MenuPage loaded');
  const navigate = useNavigate();

  // Basic pagination state (can be expanded with actual logic)
  // For now, this is just for displaying the component.
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8; // Example: How many items to show per page or category.

  // This is a simplified pagination example.
  // A real implementation would involve slicing data or fetching paginated data.
  const totalPages = Math.ceil(foodCategories.flatMap(cat => cat.items).length / itemsPerPage);


  return (
    <div className="min-h-screen flex flex-col bg-sky-50 selection:bg-yellow-300 selection:text-yellow-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 text-center my-8 drop-shadow-md"
            style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'cursive'" }}>
          Our Magical Menu
        </h1>

        {foodCategories.map((category) => (
          <section key={category.name} className="mb-16">
            <AnimatedCategoryIntro
              categoryName={category.name}
              doraemonImageUrl={category.doraemonImageUrl}
              itemImageUrl={category.itemImageUrl}
              itemAltText={category.itemAltText}
              backgroundColor={category.backgroundColor}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mt-8">
              {category.items.map((item) => (
                <ThemedFoodCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
          </section>
        ))}

        <div className="text-center my-12">
            <InteractiveGadgetButton
                onClick={() => navigate('/daily-specials')} // Navigate to Daily Specials page
                gadgetStyle="anywhere-door"
                className="text-lg py-3 px-8"
                ariaLabel="Explore Daily Specials"
            >
                <Sparkles className="mr-2 h-5 w-5" />
                Check Out Today's Specials!
            </InteractiveGadgetButton>
        </div>

        {/* Pagination (Placeholder) */}
        {totalPages > 1 && (
            <nav aria-label="Food item pagination" className="flex justify-center mt-16 mb-8">
            <Pagination>
                <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}
                        isActive={currentPage === i + 1}
                    >
                        {i + 1}
                    </PaginationLink>
                    </PaginationItem>
                ))}
                {/* Example: Show Ellipsis if more pages - simplified for now */}
                {/* {totalPages > 5 && currentPage < totalPages - 2 && <PaginationEllipsis />} */}
                <PaginationItem>
                    <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                </PaginationContent>
            </Pagination>
            </nav>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;