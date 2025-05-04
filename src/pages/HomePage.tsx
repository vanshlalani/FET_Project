import React from 'react';
import Hero from '../components/Hero';
import FeaturedRooms from '../components/FeaturedRooms';
import Amenities from '../components/Amenities';
import Testimonials from '../components/Testimonials';
import { getFeaturedRooms } from '../data/rooms';

const HomePage: React.FC = () => {
  const featuredRooms = getFeaturedRooms();
  
  return (
    <div>
      <Hero />
      <FeaturedRooms rooms={featuredRooms} />
      <Amenities />
      <Testimonials />
    </div>
  );
};

export default HomePage;