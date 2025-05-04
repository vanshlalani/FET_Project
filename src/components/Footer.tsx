import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-serif mb-6">Grand Resort</h3>
            <p className="text-gray-300 mb-4">
              Experience luxury and comfort at our prestigious hotel in the heart of the city.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-300 hover:text-white transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Luxury Avenue, Cityscape, CS 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0" />
                <span className="text-gray-300">1-800-GRAND</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@grandresort.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-navy-800 border border-navy-700 focus:outline-none focus:ring-1 focus:ring-gold-400 flex-grow"
              />
              <button 
                type="submit" 
                className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-4 py-2 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-navy-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Grand Resort. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;