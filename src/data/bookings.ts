import { Booking } from '../types';

// This would be stored in a database in a real application
export let bookings: Booking[] = [];

export const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    status: 'confirmed',
    createdAt: new Date(),
  };
  
  bookings.push(newBooking);
  return newBooking;
};

export const getBookingsByRoomId = (roomId: string): Booking[] => {
  return bookings.filter(booking => booking.roomId === roomId);
};

export const isRoomAvailable = (
  roomId: string, 
  checkIn: Date, 
  checkOut: Date
): boolean => {
  // Check if there are any overlapping bookings
  const overlappingBookings = bookings.filter(
    booking => 
      booking.roomId === roomId && 
      booking.status === 'confirmed' &&
      ((checkIn >= booking.checkIn && checkIn < booking.checkOut) || 
       (checkOut > booking.checkIn && checkOut <= booking.checkOut) ||
       (checkIn <= booking.checkIn && checkOut >= booking.checkOut))
  );
  
  return overlappingBookings.length === 0;
};

// export { bookings }