'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Ticket, Heart, ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTicketMenu, setShowTicketMenu] = useState(false);
  const [showInCountryMenu, setShowInCountryMenu] = useState(false);


  const backgroundImages = [
    '/background/background1.png',
    '/background/background2.png',
    '/background/background3.png',
    '/background/background4.png',
    '/background/background5.png',
    '/background/background6.png'
  ];

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % backgroundImages.length
    );
  }, [backgroundImages.length]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      role="banner"
      aria-label="Abuja Detty December 2025 Hero Section"
    >
      {/* Background Images with Smooth Transition */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-green-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-32 md:pt-40">
        {/* Header Text */}

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 fade-in-up">
          Naija&apos;s Capital Biggest December Celebration
        </h1>

        {/* Year */}
        <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-green-400 mb-6 fade-in-up">
          2025
        </div>

        {/* Description */}
        <p className="text-xl text-white mb-12 max-w-3xl mx-auto fade-in-up">
          family-friendly entertainment, trade fair, afrocentric music, african food and fashion festival, fun sports tournament, exciting contests, adult-only parties, concerts and cultural carnivals...unforgettable memories
        </p>

        {/* Countdown Timer */}
        <div className="fade-in-up">
          <CountdownTimer />
        </div>

        {/* Call to Action Buttons */}
        {/* <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 fade-in-up mb-2">
          <Link
            href="/events"
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Ticket className="w-6 h-6" />
            <span>Tickets</span>
          </Link>

          <Link
            href="/raffle"
            className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Raffles</span>
            <ArrowRight className="w-6 h-6" />
          </Link>

          <Link
            href="/vote"
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Heart className="w-6 h-6" />
            <span>Vote</span>
          </Link>
        </div> */}
        {/* Call to Action Buttons */}
        <div className="relative flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 fade-in-up mb-2">

          {/* TICKETS BUTTON (Triggers popup) */}
          <button
            onClick={() => {
              setShowTicketMenu(!showTicketMenu);
              setShowInCountryMenu(false);
            }}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Ticket className="w-6 h-6" />
            <span>Tickets</span>
          </button>

          {/* POPUP MENU FOR TICKETS */}
          {showTicketMenu && (
            <div className="absolute top-20 bg-white shadow-xl rounded-lg p-4 space-y-3 w-60 z-50 border">

              {/* Diaspora Ticket */}
              <a
                href="/diaspora"
                className="block bg-green-600 text-white px-4 py-3 rounded-md text-center font-semibold hover:bg-green-700 transition"
              >
                Diaspora Ticket
              </a>

              {/* In-Country Button */}
              <button
                onClick={() => setShowInCountryMenu(!showInCountryMenu)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-md font-semibold hover:bg-gray-700 transition"
              >
                In-Country
              </button>

              {/* Submenu for In-Country */}
              {showInCountryMenu && (
                <div className="space-y-3 pt-2">

                  {/* Access */}
                  <Link
                    href="/events"
                    className="block bg-green-500 text-white px-4 py-3 rounded-md text-center font-semibold hover:bg-green-600 transition"
                  >
                    Access
                  </Link>

                  {/* Raffle */}
                  <Link
                    href="/raffle"
                    className="block bg-red-600 text-white px-4 py-3 rounded-md text-center font-semibold hover:bg-red-700 transition"
                  >
                    Raffle
                  </Link>

                </div>
              )}
            </div>
          )}

          {/* RAFFLES BUTTON (Normal) */}
          <Link
            href="/raffle"
            className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Raffles</span>
            <ArrowRight className="w-6 h-6" />
          </Link>

          {/* VOTE BUTTON (Normal) */}
          <Link
            href="/vote"
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Heart className="w-6 h-6" />
            <span>Vote</span>
          </Link>
        </div>



      </div>

      {/* Image Navigation Dots */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to background image ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  );
}
