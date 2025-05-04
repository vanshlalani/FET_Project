import React, { useState } from 'react';
import { Filter } from 'lucide-react';

interface RoomFilterProps {
  onFilterChange: (filters: {
    type: string[];
    minPrice: number;
    maxPrice: number;
    capacity: number;
  }) => void;
  priceRange: { min: number; max: number };
}

const RoomFilter: React.FC<RoomFilterProps> = ({ onFilterChange, priceRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: [] as string[],
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    capacity: 1
  });

  const roomTypes = [
    { id: 'standard', label: 'Standard' },
    { id: 'deluxe', label: 'Deluxe' },
    { id: 'suite', label: 'Suite' },
    { id: 'presidential', label: 'Presidential' }
  ];

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilters(prev => {
      const newTypes = checked 
        ? [...prev.type, value]
        : prev.type.filter(t => t !== value);
      
      const newFilters = { ...prev, type: newTypes };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const capacity = parseInt(e.target.value);
    setFilters(prev => {
      const newFilters = { ...prev, capacity };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = { ...prev, [name]: parseInt(value) };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const resetFilters = () => {
    const resetFilters = {
      type: [],
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      capacity: 1
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="mb-8 bg-white shadow rounded-lg p-4">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-serif text-navy-900 flex items-center">
          <Filter size={20} className="mr-2" />
          Filter Rooms
        </h2>
        <button 
          className="text-navy-700 hover:text-navy-900"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse filters" : "Expand filters"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Room Type Filter */}
          <div>
            <h3 className="font-medium mb-3 text-navy-900">Room Type</h3>
            <div className="space-y-2">
              {roomTypes.map(type => (
                <label key={type.id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={type.id}
                    checked={filters.type.includes(type.id)}
                    onChange={handleTypeChange}
                    className="rounded text-gold-500 focus:ring-gold-500 mr-2"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>
          
          {/* Guests Filter */}
          <div>
            <h3 className="font-medium mb-3 text-navy-900">Guests</h3>
            <select 
              value={filters.capacity}
              onChange={handleCapacityChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
          
          {/* Price Range Filter */}
          <div className="md:col-span-2">
            <h3 className="font-medium mb-3 text-navy-900">Price Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="minPrice"
                    min={priceRange.min}
                    max={filters.maxPrice}
                    value={filters.minPrice}
                    onChange={handlePriceChange}
                    className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="maxPrice"
                    min={filters.minPrice}
                    max={priceRange.max}
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Reset Button */}
          <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomFilter;