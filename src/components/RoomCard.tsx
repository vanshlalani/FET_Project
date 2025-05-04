import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Users, ArrowRight } from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={room.images[0]} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {room.featured && (
          <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-serif">{room.name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-600 flex items-center">
            <Bed size={16} className="mr-1" />
            <span className="text-sm">{room.beds}</span>
          </div>
          <div className="text-gray-600 flex items-center">
            <Users size={16} className="mr-1" />
            <span className="text-sm">Up to {room.capacity} guests</span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 line-clamp-2">{room.description}</p>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-navy-900">${room.price}</span>
            <span className="text-gray-600 text-sm">/night</span>
          </div>
          <Link 
            to={`/rooms/${room.id}`} 
            className="inline-flex items-center text-navy-900 hover:text-gold-600 font-medium transition-colors"
          >
            View Details
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;