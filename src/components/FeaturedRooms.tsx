import React from 'react';
import RoomCard from './RoomCard';
import { Room } from '../types';

interface FeaturedRoomsProps {
  rooms: Room[];
}

const FeaturedRooms: React.FC<FeaturedRoomsProps> = ({ rooms }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-navy-900 mb-3">Featured Accommodations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after rooms and suites, each crafted to provide an unforgettable stay experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => (
            <div key={room.id} className="animate-fade-in">
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;