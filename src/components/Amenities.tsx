import React from 'react';
import { Wifi, Coffee, Tv, Wind, Utensils, Dumbbell } from 'lucide-react';

const Amenities: React.FC = () => {
  const amenities = [
    { 
      id: 1, 
      icon: <Wifi size={40} />, 
      title: 'High-Speed WiFi', 
      description: 'Stay connected with complimentary high-speed internet access throughout the property.' 
    },
    { 
      id: 2, 
      icon: <Utensils size={40} />, 
      title: 'Fine Dining', 
      description: 'Experience exceptional cuisine at our award-winning restaurants and bars.' 
    },
    { 
      id: 3, 
      icon: <Dumbbell size={40} />, 
      title: 'Fitness Center', 
      description: 'Maintain your workout routine in our state-of-the-art fitness facility.' 
    },
    { 
      id: 4, 
      icon: <Coffee size={40} />, 
      title: 'Room Service', 
      description: '24/7 room service available for your convenience and comfort.' 
    },
    { 
      id: 5, 
      icon: <Tv size={40} />, 
      title: 'Entertainment', 
      description: 'Smart TVs with premium channels and streaming services in all rooms.' 
    },
    { 
      id: 6, 
      icon: <Wind size={40} />, 
      title: 'Climate Control', 
      description: 'Individually controlled heating and air conditioning in every room.' 
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-navy-900 mb-3">Hotel Amenities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enjoy a wide range of premium amenities designed to enhance your stay and create memorable experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map(amenity => (
            <div 
              key={amenity.id} 
              className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-gold-500 mb-4">{amenity.icon}</div>
              <h3 className="text-xl font-medium text-navy-900 mb-2">{amenity.title}</h3>
              <p className="text-gray-600">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;