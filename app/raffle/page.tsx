'use client';

import { useState } from 'react';
import { Ticket, Users, Calendar, Award, Check, ShoppingCart } from 'lucide-react';
import PaymentModal from '@/components/PaymentModal';
import Image from 'next/image';

interface RaffleTicket {
  id: string;
  name: string;
  price: number;
  type: 'individual' | 'family';
  description: string;
  features: string[];
  popular?: boolean;
  image?: string;
}

export default function RafflePage() {
  const [selectedTicket, setSelectedTicket] = useState<RaffleTicket | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const raffleTickets: RaffleTicket[] = [
    {
      id: 'low-key-cruiz',
      name: 'Low Key Cruiz',
      price: 12000,
      type: 'individual',
      description: 'Perfect for individuals who want to enjoy the festivities',
      features: [
        '12 days access to the ADD village',
        '2K raffle ticket',
        'Access to all village activities',
        'Entry to daily events'
      ],
      image: '/packages/lowkey cruz.jpeg'
    },
    {
      id: 'wahala-free-pass',
      name: 'Wahala Free Pass',
      price: 25000,
      type: 'individual',
      description: 'Premium access for individuals seeking an enhanced experience',
      features: [
        '12 days access to the ADD village',
        '5K raffle ticket',
        'Priority access to events',
        'VIP lounge access',
        'Complimentary refreshments'
      ],
      popular: true,
      image: '/packages/wahala free.jpeg'
    },
    {
      id: 'soft-life-pass',
      name: 'Soft Life Pass',
      price: 50000,
      type: 'individual',
      description: 'Ultimate luxury experience for individuals',
      features: [
        '12 days access to the ADD village',
        '10K raffle ticket',
        'VIP access to all events',
        'Premium parking',
        'Exclusive meet & greet opportunities',
        'Premium gift bag'
      ],
      image: '/packages/soft life.jpeg'
    },
    {
      id: 'full-ground-pass',
      name: 'Full Ground Pass',
      price: 75000,
      type: 'family',
      description: 'Complete family package with great value',
      features: [
        '12 days access for family of 4 to ADD village',
        '4 raffle tickets of 2K each',
        'Family-friendly activities access',
        'Kid-friendly zones',
        'Family photo opportunity'
      ],
      image: '/packages/full ground.jpeg'
    },
    {
      id: 'correct-package',
      name: 'Correct Package',
      price: 100000,
      type: 'family',
      description: 'Premium family experience with enhanced benefits',
      features: [
        '12 days access for family of 4 to ADD village',
        '4 raffle tickets of 5K each',
        'Priority family seating',
        'VIP family lounge',
        'Special family activities',
        'Premium family gift bag'
      ],
      popular: true,
      image: '/packages/correct package.jpeg'
    },
    {
      id: 'odogwu-vibez',
      name: 'Odogwu Vibez',
      price: 200000,
      type: 'family',
      description: 'The ultimate luxury family package',
      features: [
        '12 days access for family of 4 to ADD village',
        '4 raffle tickets of 10K each',
        'VIP everything for the whole family',
        'Dedicated family concierge',
        'Premium family dining',
        'Exclusive family experiences',
        'Luxury family gift bag'
      ],
      image: '/packages/odogwu vibez.jpeg'
    }
  ];

  const handlePurchase = (ticketId: string) => {
    const ticket = raffleTickets.find(t => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    // Here you can handle the successful payment
    console.log('Payment successful:', paymentData);
    // You could redirect to a success page or show a confirmation
    alert(`Thank you for your purchase! You have successfully purchased ${paymentData.quantity} ${paymentData.ticketName} ticket(s).`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Abuja Detty December
              <br />
              <span className="text-green-200">Raffle Tickets</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Get your chance to win amazing prizes including Cars, Land, Solar Systems, and more!
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-6 h-6" />
              <span className="text-lg">December 21, 2025 - January 2, 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Raffle Tickets Only
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 text-center border-2 border-yellow-300">
              <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Only ₦2K</h3>
              <p className="text-lg text-gray-700">A Solar System</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 text-center border-2 border-green-300">
              <Award className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Only ₦5K</h3>
              <p className="text-lg text-gray-700">A Land</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center border-2 border-blue-300">
              <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Only ₦10K</h3>
              <p className="text-lg text-gray-700">A Car</p>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Packages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Individual Packages</h2>
            <p className="text-gray-600">Perfect for solo adventurers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {raffleTickets
              .filter(ticket => ticket.type === 'individual')
              .map((ticket) => (
                <div
                  key={ticket.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                    ticket.popular ? 'ring-4 ring-green-500' : ''
                  }`}
                >
                  {ticket.popular && (
                    <div className="bg-green-600 text-white text-center py-2 text-sm font-semibold">
                      MOST POPULAR
                    </div>
                  )}
                  {ticket.image && (
                    <div className="relative w-full h-96 bg-gray-200 overflow-hidden">
                      <Image
                        src={ticket.image}
                        alt={ticket.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <button
                      onClick={() => handlePurchase(ticket.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Get This Package</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Family Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Family Packages</h2>
            <p className="text-gray-600">Complete family experiences for 4 people</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {raffleTickets
              .filter(ticket => ticket.type === 'family')
              .map((ticket) => (
                <div
                  key={ticket.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                    ticket.popular ? 'ring-4 ring-green-500' : ''
                  }`}
                >
                  {ticket.popular && (
                    <div className="bg-green-600 text-white text-center py-2 text-sm font-semibold">
                      MOST POPULAR
                    </div>
                  )}
                  {ticket.image && (
                    <div className="relative w-full h-96 bg-gray-200 overflow-hidden">
                      <Image
                        src={ticket.image}
                        alt={ticket.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <button
                      onClick={() => handlePurchase(ticket.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Get This Package</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border-2 border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-center">Payment Details</h2>
            <div className="bg-white text-gray-900 rounded-lg p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="font-semibold">Account Number:</span>
                  <span className="text-lg">6142456344</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="font-semibold">Bank:</span>
                  <span className="text-lg">OPay</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Account Name:</span>
                  <span className="text-lg">Abuja Detty December Ventures</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-white/90 mb-4">Contact Us</p>
              <div className="flex items-center justify-center space-x-6">
                <a href="tel:+2348144390852" className="flex items-center space-x-2 text-white hover:text-green-200 transition-colors">
                  <Ticket className="w-5 h-5" />
                  <span>+2348144390852</span>
                </a>
                <a href="tel:+2348118357272" className="flex items-center space-x-2 text-white hover:text-green-200 transition-colors">
                  <Ticket className="w-5 h-5" />
                  <span>+2348118357272</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedTicket(null);
        }}
        ticket={selectedTicket}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
