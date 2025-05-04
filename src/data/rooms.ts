import { Room } from '../types';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Deluxe Mountain View',
    type: 'deluxe',
    price: 299,
    capacity: 2,
    size: 400,
    beds: '1 King Bed',
    amenities: ['Free WiFi', 'Mountain View', 'Air conditioning', 'Flat-screen TV', 'Mini bar', 'Coffee maker'],
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
    ],
    description: 'Our Deluxe Mountain View room offers breathtaking panoramic views of the surrounding mountains. This spacious accommodation features a plush king-size bed, elegant furnishings, and a luxurious bathroom with premium amenities.',
    featured: true,
    available: true
  },
  {
    id: '2',
    name: 'Premium Ocean Suite',
    type: 'suite',
    price: 499,
    capacity: 3,
    size: 650,
    beds: '1 King Bed + 1 Sofa Bed',
    amenities: ['Free WiFi', 'Ocean View', 'Air conditioning', 'Flat-screen TV', 'Mini bar', 'Coffee maker', 'Balcony', 'Sitting area', 'Bathrobes'],
    images: [
      'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    ],
    description: 'Indulge in luxury with our Premium Ocean Suite featuring a private balcony with stunning ocean views. The suite includes a separate living area with a comfortable sofa bed, making it perfect for small families or couples seeking extra space.',
    featured: true,
    available: true
  },
  {
    id: '3',
    name: 'Standard City Room',
    type: 'standard',
    price: 199,
    capacity: 2,
    size: 320,
    beds: '2 Queen Beds',
    amenities: ['Free WiFi', 'City View', 'Air conditioning', 'Flat-screen TV', 'Coffee maker'],
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
    ],
    description: 'Our Standard City Room offers comfortable accommodations with modern amenities. Perfect for business travelers or couples exploring the city, this room provides all the essentials for a pleasant stay.',
    featured: false,
    available: true
  },
  {
    id: '4',
    name: 'Presidential Penthouse',
    type: 'presidential',
    price: 999,
    capacity: 4,
    size: 1200,
    beds: '1 King Bed + 2 Queen Beds',
    amenities: ['Free WiFi', 'Panoramic View', 'Air conditioning', 'Multiple Flat-screen TVs', 'Full bar', 'Kitchen', 'Dining area', 'Jacuzzi', 'Private terrace', 'Butler service'],
    images: [
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
    ],
    description: 'Experience ultimate luxury in our Presidential Penthouse Suite. This exclusive accommodation spans the entire top floor, offering unrivaled views and privacy. Features include a spacious living area, dining room, full kitchen, and a private terrace with a jacuzzi.',
    featured: true,
    available: true
  },
  {
    id: '5',
    name: 'Family Deluxe Room',
    type: 'deluxe',
    price: 349,
    capacity: 4,
    size: 550,
    beds: '2 Queen Beds',
    amenities: ['Free WiFi', 'Garden View', 'Air conditioning', 'Flat-screen TV', 'Mini fridge', 'Coffee maker', 'Extra space'],
    images: [
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
    ],
    description: 'Our Family Deluxe Room is specially designed to accommodate families in comfort and style. With two queen beds and extra space, this room ensures everyone has room to relax after a day of activities.',
    featured: false,
    available: true
  },
  {
    id: '6',
    name: 'Executive Business Suite',
    type: 'suite',
    price: 399,
    capacity: 2,
    size: 480,
    beds: '1 King Bed',
    amenities: ['Free WiFi', 'City View', 'Air conditioning', 'Flat-screen TV', 'Mini bar', 'Coffee maker', 'Work desk', 'Lounge area', 'Printer'],
    images: [
      'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg',
      'https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg',
    ],
    description: 'Designed with the business traveler in mind, our Executive Business Suite combines comfort with functionality. Enjoy a separate work area with a large desk, ergonomic chair, and business amenities, along with a comfortable king bed for a good night\'s rest.',
    featured: false,
    available: true
  },
];

export const getAvailableRooms = (): Room[] => {
  return rooms.filter(room => room.available);
};

export const getRoomById = (id: string): Room | undefined => {
  return rooms.find(room => room.id === id);
};

export const getFeaturedRooms = (): Room[] => {
  return rooms.filter(room => room.featured);
};