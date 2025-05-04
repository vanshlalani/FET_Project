export interface Room {
  id: string;
  name: string;
  type: 'standard' | 'deluxe' | 'suite' | 'presidential';
  price: number;
  capacity: number;
  size: number; // in square feet
  beds: string;
  amenities: string[];
  images: string[];
  description: string;
  featured: boolean;
  available: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}