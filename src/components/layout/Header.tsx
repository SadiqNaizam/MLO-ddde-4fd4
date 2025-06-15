import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { DoorOpen, Sparkles, ShoppingCart, UserCircle, Menu as MenuIcon, X } from 'lucide-react';

const navLinks = [
  { to: "/menu", label: "Menu", icon: <DoorOpen className="mr-2 h-5 w-5" /> },
  { to: "/daily-specials", label: "Specials", icon: <Sparkles className="mr-2 h-5 w-5" /> },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log('Header component loaded');

  const activeLinkClasses = "text-yellow-400 border-b-2 border-yellow-400";
  const inactiveLinkClasses = "hover:text-yellow-300 transition-colors duration-300";

  const commonLinkClasses = "flex items-center px-3 py-2 rounded-md text-base font-medium";

  return (
    <header className="bg-blue-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight flex items-center">
              <img src="/doraemon-logo-placeholder.png" alt="Doraemon Eats Logo" className="h-10 w-auto mr-2" onError={(e) => e.currentTarget.style.display = 'none'}/>
              <span className="hover:text-yellow-300 transition-colors">Doraemon Eats</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side icons (Cart, User) - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className={`p-2 rounded-full ${inactiveLinkClasses} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white`}>
              <ShoppingCart className="h-7 w-7" />
              <span className="sr-only">View Cart</span>
            </Link>
            {/* Placeholder for User/Login */}
            <Button variant="ghost" className={`p-2 rounded-full ${inactiveLinkClasses} hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white`}>
              <UserCircle className="h-7 w-7" />
              <span className="sr-only">User Account</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className={`p-2 mr-2 rounded-full ${inactiveLinkClasses} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white`}>
              <ShoppingCart className="h-7 w-7" />
              <span className="sr-only">View Cart</span>
            </Link>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                  <MenuIcon className="h-7 w-7" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-blue-600 text-white p-6 border-l-0">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-blue-700">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <NavLink
                      key={`mobile-${link.to}`}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center py-3 px-4 rounded-lg text-lg ${isActive ? "bg-blue-700 text-yellow-300" : "hover:bg-blue-700 hover:text-yellow-200 transition-colors"}`
                      }
                    >
                      {React.cloneElement(link.icon, { className: "mr-3 h-6 w-6" })}
                      {link.label}
                    </NavLink>
                  ))}
                  <hr className="my-3 border-blue-500" />
                  {/* Placeholder for User/Login in mobile */}
                  <Button variant="ghost" className="w-full justify-start py-3 px-4 rounded-lg text-lg hover:bg-blue-700 hover:text-yellow-200 transition-colors">
                    <UserCircle className="mr-3 h-6 w-6" />
                    Login / Account
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;