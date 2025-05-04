import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookings } from '../data/bookings';
import { getRoomById } from '../data/rooms';
import { CheckCircle, Calendar, Users, CreditCard } from 'lucide-react';

const BookingConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const booking = bookings.find(b => b.id === id);
  
  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-20">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl text-gray-700 mb-4">Booking not found</h2>
          <Link 
            to="/rooms"
            className="inline-block px-6 py-2 bg-navy-700 text-white rounded hover:bg-navy-800 transition-colors"
          >
            Browse Rooms
          </Link>
        </div>
      </div>
    );
  }
  
  const room = getRoomById(booking.roomId);
  const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  
  const totalPrice = room ? room.price * nights : 0;

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-navy-800 text-white p-6 text-center">
            <CheckCircle size={56} className="mx-auto mb-4 text-gold-400" />
            <h1 className="text-3xl font-serif mb-2">Booking Confirmed!</h1>
            <p className="text-gray-300">
              Thank you for choosing Grand Resort. Your reservation has been confirmed.
            </p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-2xl font-serif text-navy-900 mb-4">Booking Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-navy-900 mb-2">
                    <Calendar size={20} className="mr-2 text-gold-500" />
                    <span className="font-medium">Check-in</span>
                  </div>
                  <p className="text-gray-600">{checkInDate}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-navy-900 mb-2">
                    <Calendar size={20} className="mr-2 text-gold-500" />
                    <span className="font-medium">Check-out</span>
                  </div>
                  <p className="text-gray-600">{checkOutDate}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-navy-900 mb-2">
                    <Users size={20} className="mr-2 text-gold-500" />
                    <span className="font-medium">Guests</span>
                  </div>
                  <p className="text-gray-600">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-navy-900 mb-2">
                    <CreditCard size={20} className="mr-2 text-gold-500" />
                    <span className="font-medium">Payment</span>
                  </div>
                  <p className="text-gray-600">Due at check-in</p>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-2xl font-serif text-navy-900 mb-4">Reservation Summary</h2>
              
              <div className="flex items-start mb-4">
                {room && (
                  <img 
                    src={room.images[0]} 
                    alt={room.name} 
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                )}
                <div>
                  <h3 className="text-lg font-medium text-navy-900">{room?.name}</h3>
                  <p className="text-gray-600">{room?.type.charAt(0).toUpperCase() + room?.type.slice(1)} Room</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Rate:</span>
                  <span className="text-navy-900">${room?.price}/night</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="text-navy-900">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-navy-900">${totalPrice}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif text-navy-900 mb-4">Guest Information</h2>
              
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 block text-sm">Name:</span>
                  <span className="text-navy-900 font-medium">{booking.guestName}</span>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">Email:</span>
                  <span className="text-navy-900 font-medium">{booking.email}</span>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">Phone:</span>
                  <span className="text-navy-900 font-medium">{booking.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                to="/"
                className="inline-block px-6 py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;