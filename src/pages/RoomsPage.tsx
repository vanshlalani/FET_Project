import React, { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard';
import RoomFilter from '../components/RoomFilter';
import { rooms } from '../data/rooms';
import { Room } from '../types';

const RoomsPage: React.FC = () => {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  
  useEffect(() => {
    // Calculate price range from rooms data
    const prices = rooms.map(room => room.price);
    setPriceRange({
      min: Math.min(...prices),
      max: Math.max(...prices)
    });
  }, []);
  
  const handleFilterChange = (filters: {
    type: string[];
    minPrice: number;
    maxPrice: number;
    capacity: number;
  }) => {
    let result = [...rooms];
    
    // Filter by room type
    if (filters.type.length > 0) {
      result = result.filter(room => filters.type.includes(room.type));
    }
    
    // Filter by price range
    result = result.filter(
      room => room.price >= filters.minPrice && room.price <= filters.maxPrice
    );
    
    // Filter by capacity
    result = result.filter(room => room.capacity >= filters.capacity);
    
    setFilteredRooms(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-navy-900 mb-3">Our Rooms & Suites</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the perfect accommodation for your stay. From cozy standard rooms to luxurious suites, we have options to suit every preference and budget.
          </p>
        </div>
        
        <RoomFilter onFilterChange={handleFilterChange} priceRange={priceRange} />
        
        {filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-700 mb-2">No rooms found</h3>
            <p className="text-gray-500">
              Please adjust your filters to see available rooms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map(room => (
              <div key={room.id} className="animate-fade-in">
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;