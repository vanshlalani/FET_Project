import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image: 'https://randomuser.me/api/portraits/women/12.jpg',
      rating: 5,
      text: 'Absolutely fantastic experience! The room was immaculate, the bed extremely comfortable, and the service was exceptional. The staff went above and beyond to make our anniversary special.'
    },
    {
      id: 2,
      name: 'David Chen',
      location: 'Toronto, Canada',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'My stay at Grand Resort exceeded all expectations. The Presidential Suite was worth every penny - stunning views, luxurious furnishings, and impeccable service. I\'ll definitely be returning.'
    },
    {
      id: 3,
      name: 'Emily Martinez',
      location: 'London, UK',
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 4,
      text: 'Beautiful hotel with excellent amenities. The rooms are spacious and well-appointed. The only small issue was the wait time at the restaurant, but the quality of the food made up for it.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-navy-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-white mb-3">Guest Experiences</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover what our guests have to say about their stay at Grand Resort.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="flex overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`w-full flex-shrink-0 transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'
                }`}
                style={{ transform: index === currentIndex ? 'translateX(0)' : 'translateX(100%)' }}
              >
                <div className="text-center p-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={18}
                        className={i < testimonial.rating ? 'text-gold-500' : 'text-gray-500'} 
                        fill={i < testimonial.rating ? '#C9A95D' : 'none'}
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl italic mb-6">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <p className="font-semibold text-gold-400">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-navy-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-navy-700 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-gold-500' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;