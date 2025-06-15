import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Heart } from 'lucide-react'; // Using Bell as a subtle Doraemon theme element

const Footer: React.FC = () => {
  console.log('Footer component loaded');

  return (
    <footer className="bg-sky-100 text-sky-800 py-8 border-t border-sky-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center md:text-left">
          <div>
            <h5 className="font-semibold mb-2 text-lg text-sky-900">Doraemon's Restaurant</h5>
            <p className="text-sm">Magical dining experiences, delivered!</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2 text-lg text-sky-900">Quick Links</h5>
            <ul className="space-y-1">
              <li>
                <Link to="/menu" className="text-sm hover:text-red-500 hover:underline transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/daily-specials" className="text-sm hover:text-red-500 hover:underline transition-colors">
                  Daily Specials
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-sm hover:text-red-500 hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2 text-lg text-sky-900">Legal</h5>
            <ul className="space-y-1">
              <li>
                <Link to="/#terms" className="text-sm hover:text-red-500 hover:underline transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/#privacy" className="text-sm hover:text-red-500 hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-300 pt-6 text-center text-sm">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
            <Bell size={18} className="text-yellow-500" />
            <p>
              &copy; {new Date().getFullYear()} Doraemon's Magical Restaurant. All Rights Reserved.
            </p>
            <Heart size={18} className="text-red-500" />
          </div>
          <p className="text-xs text-sky-700">
            Bringing smiles with every bite, powered by Doraemon's amazing gadgets!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;