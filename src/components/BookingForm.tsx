import React, { useState } from 'react';
import { User, Mail, Phone, Users } from 'lucide-react';
import DateRangePicker from './DateRangePicker';
import { addBooking, isRoomAvailable } from '../data/bookings';
import { Room } from '../types';

interface BookingFormProps {
  room: Room;
  onSuccess: (bookingId: string) => void;
}

interface FormData {
  guestName: string;
  email: string;
  phone: string;
  guests: number;
  checkIn: Date | null;
  checkOut: Date | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ room, onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    guestName: '',
    email: '',
    phone: '',
    guests: 1,
    checkIn: null,
    checkOut: null
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateChange = (dateRange: { checkIn: Date; checkOut: Date }) => {
    setFormData(prev => ({ 
      ...prev, 
      checkIn: dateRange.checkIn, 
      checkOut: dateRange.checkOut 
    }));
    
    // Clear date-related errors
    setErrors(prev => ({ 
      ...prev, 
      checkIn: undefined, 
      checkOut: undefined 
    }));
    
    setAvailabilityError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.checkIn || !formData.checkOut) {
      newErrors.checkIn = 'Please select check-in and check-out dates';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Check if room is available for the selected dates
    if (formData.checkIn && formData.checkOut && !isRoomAvailable(room.id, formData.checkIn, formData.checkOut)) {
      setAvailabilityError('Room is not available for the selected dates');
      setIsSubmitting(false);
      return;
    }
    
    // Add booking
    try {
      const booking = addBooking({
        roomId: room.id,
        guestName: formData.guestName,
        email: formData.email,
        phone: formData.phone,
        guests: Number(formData.guests),
        checkIn: formData.checkIn!,
        checkOut: formData.checkOut!
      });
      
      // Call success handler with booking ID
      onSuccess(booking.id);
    } catch (error) {
      console.error('Error creating booking:', error);
      setAvailabilityError('There was an error processing your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-serif text-navy-900 mb-6">Book Your Stay</h2>
      
      {availabilityError && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          {availabilityError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in / Check-out
            </label>
            <DateRangePicker onChange={handleDateChange} minStay={1} />
            {errors.checkIn && (
              <p className="mt-1 text-sm text-red-600">{errors.checkIn}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests
            </label>
            <div className="relative">
              <Users size={18} className="absolute left-3 top-2.5 text-gray-500" />
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
              >
                {Array.from({ length: room.capacity }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                id="guestName"
                name="guestName"
                type="text"
                value={formData.guestName}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
                placeholder="John Doe"
              />
            </div>
            {errors.guestName && (
              <p className="mt-1 text-sm text-red-600">{errors.guestName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
                placeholder="(123) 456-7890"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-600">Price per night</p>
              <p className="text-2xl font-bold text-navy-900">${room.price}</p>
            </div>
            {formData.checkIn && formData.checkOut && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Total for stay</p>
                <p className="text-2xl font-bold text-navy-900">
                  ${room.price * Math.ceil((formData.checkOut.getTime() - formData.checkIn.getTime()) / (1000 * 60 * 60 * 24))}
                </p>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Book Now'}
          </button>
          
          <p className="mt-4 text-sm text-gray-600 text-center">
            You won't be charged yet. Payment will be collected at check-in.
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;