import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg)',
          backgroundPosition: 'center 10%'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 animate-fade-in-down">
          Experience Luxury & Comfort
        </h1>
        <p className="text-xl text-white max-w-3xl mb-10 animate-fade-in">
          Welcome to Grand Resort, where exceptional service meets unparalleled luxury. 
          Discover a stay beyond your expectations.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up">
          <Link 
            to="/rooms" 
            className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-md transition-colors duration-300"
          >
            Explore Rooms
          </Link>
          <Link 
            to="/about" 
            className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white text-white font-bold rounded-md transition-colors duration-300"
          >
            About Us
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;