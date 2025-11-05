'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date to December 21, 2025 at 12:00 AM WAT (West Africa Time)
    const targetDate = new Date('2025-12-21T00:00:00').getTime();
    
    // Log for debugging
    console.log('Target Date:', new Date(targetDate).toLocaleString());
    console.log('Current Date:', new Date().toLocaleString());

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      // Log difference in days for debugging
      const daysDiff = Math.floor(difference / (1000 * 60 * 60 * 24));
      if (daysDiff < 5 && daysDiff >= 0) {
        console.log('Days until event:', daysDiff);
      }

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex justify-center space-x-4 mb-8">
      <div className="bg-gray-800 rounded-lg px-4 py-3 min-w-[80px] text-center">
        <div className="text-2xl font-bold text-white">
          {formatNumber(timeLeft.days)}
        </div>
        <div className="text-sm text-white opacity-80">Days</div>
      </div>
      <div className="bg-gray-800 rounded-lg px-4 py-3 min-w-[80px] text-center">
        <div className="text-2xl font-bold text-white">
          {formatNumber(timeLeft.hours)}
        </div>
        <div className="text-sm text-white opacity-80">Hours</div>
      </div>
      <div className="bg-gray-800 rounded-lg px-4 py-3 min-w-[80px] text-center">
        <div className="text-2xl font-bold text-white">
          {formatNumber(timeLeft.minutes)}
        </div>
        <div className="text-sm text-white opacity-80">Mins</div>
      </div>
      <div className="bg-gray-800 rounded-lg px-4 py-3 min-w-[80px] text-center">
        <div className="text-2xl font-bold text-white">
          {formatNumber(timeLeft.seconds)}
        </div>
        <div className="text-sm text-white opacity-80">Secs</div>
      </div>
    </div>
  );
}
