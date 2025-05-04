import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById } from '../data/rooms';
import { Bed, Users, Square, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import BookingForm from '../components/BookingForm';

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = getRoomById(id || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  if (!room) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-700 mb-4">Room not found</h2>
          <button 
            onClick={() => navigate('/rooms')}
            className="px-6 py-2 bg-navy-700 text-white rounded hover:bg-navy-800 transition-colors"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }
  
  const handlePrevImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setActiveImageIndex(prev => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleBookingSuccess = (bookingId: string) => {
    navigate(`/booking-confirmation/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/rooms')}
            className="flex items-center text-navy-700 hover:text-navy-900 transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Rooms
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96">
            {room.images.map((image, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === activeImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${room.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            
            {/* Navigation Buttons */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {room.images.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Room Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl font-serif text-navy-900 mb-2">{room.name}</h1>
                <p className="text-gray-600">{room.description}</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-navy-900 mb-2">
                    <Bed size={20} className="mr-2" />
                    <span className="font-medium">Bed Type</span>
                  </div>
                  <p className="text-gray-600">{room.beds}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-navy-900 mb-2">
                    <Users size={20} className="mr-2" />
                    <span className="font-medium">Capacity</span>
                  </div>
                  <p className="text-gray-600">{room.capacity} Guests</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-navy-900 mb-2">
                    <Square size={20} className="mr-2" />
                    <span className="font-medium">Room Size</span>
                  </div>
                  <p className="text-gray-600">{room.size} sq ft</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-serif text-navy-900 mb-4">Room Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={16} className="text-gold-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Booking Form */}
            <div>
              <BookingForm room={room} onSuccess={handleBookingSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;