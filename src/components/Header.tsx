import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full z-50 transition-all duration-300 bg-gradient-to-b from-black/70 to-transparent">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold text-white">
            Grand Resort
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link to="/" className="text-white hover:text-gold-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/rooms" className="text-white hover:text-gold-400 transition-colors">
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white hover:text-gold-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white hover:text-gold-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center text-white">
              <Phone size={16} className="mr-2" />
              <span className="text-sm">1-800-GRAND</span>
            </div>
          </div>
          
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy-900 text-white">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/rooms" 
                  className="block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="flex items-center mt-4 pt-4 border-t border-navy-700">
              <Phone size={16} className="mr-2" />
              <span className="text-sm">1-800-GRAND</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;