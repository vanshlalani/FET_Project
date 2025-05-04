import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';

interface DateRangePickerProps {
  onChange: (dateRange: { checkIn: Date; checkOut: Date }) => void;
  minStay?: number;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, minStay = 1 }) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setCheckIn(date);
    setError(null);
    
    if (date && checkOut) {
      validateDates(date, checkOut);
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setCheckOut(date);
    setError(null);
    
    if (checkIn && date) {
      validateDates(checkIn, date);
    }
  };

  const validateDates = (start: Date, end: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {
      setError("Check-in date cannot be in the past");
      return;
    }
    
    if (end <= start) {
      setError("Check-out date must be after check-in date");
      return;
    }
    
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (nights < minStay) {
      setError(`Minimum stay is ${minStay} night${minStay > 1 ? 's' : ''}`);
      return;
    }
    
    onChange({ checkIn: start, checkOut: end });
  };

  const getMinCheckoutDate = (): string => {
    if (!checkIn) return '';
    
    const minDate = new Date(checkIn);
    minDate.setDate(minDate.getDate() + minStay);
    return formatDateForInput(minDate);
  };

  const getTodayString = (): string => {
    const today = new Date();
    return formatDateForInput(today);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="w-full mb-4 sm:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={formatDateForInput(checkIn)}
              onChange={handleCheckInChange}
              min={getTodayString()}
              className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
            <CalendarDays className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
        </div>
        
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={formatDateForInput(checkOut)}
              onChange={handleCheckOutChange}
              min={getMinCheckoutDate() || getTodayString()}
              disabled={!checkIn}
              className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
            <CalendarDays className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
        </div>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      {checkIn && checkOut && !error && (
        <div className="text-sm text-gray-600">
          {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;