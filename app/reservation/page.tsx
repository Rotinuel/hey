'use client';

import Link from 'next/link';
import { BedDouble, Building2, Plane, Car, ArrowRight, MapPin, Phone } from 'lucide-react';

export default function ReservationPage() {
  const hotels = [
    { name: 'Royal Vista Hotel', location: 'Central District', phone: '+234 800 000 0001' },
    { name: 'Green Garden Suites', location: 'Wuse II', phone: '+234 800 000 0002' },
    { name: 'Sunrise Grand', location: 'Garki', phone: '+234 800 000 0003' },
    { name: 'Capital Crown Hotel', location: 'Maitama', phone: '+234 800 000 0004' },
    { name: 'Emerald City Lodge', location: 'Jabi', phone: '+234 800 000 0005' },
  ];

  const apartments = [
    { name: 'Palm Court Apartments', location: 'Guzape', phone: '+234 800 000 0011' },
    { name: 'The Haven Residences', location: 'Katampe', phone: '+234 800 000 0012' },
    { name: 'CityView Shortlets', location: 'Asokoro', phone: '+234 800 000 0013' },
    { name: 'Luxe Homes Abuja', location: 'Wuye', phone: '+234 800 000 0014' },
    { name: 'Serene Suites', location: 'Lokogoma', phone: '+234 800 000 0015' },
  ];

  const airportPartners = [
    { name: 'Swift Transfers', info: '24/7 airport pickup & drop-off', phone: '+234 800 000 0101' },
    { name: 'AeroLink Rides', info: 'Real-time flight tracking', phone: '+234 800 000 0102' },
    { name: 'Prime Airport Shuttles', info: 'Sedan & SUV options', phone: '+234 800 000 0103' },
    { name: 'CityGate Transfers', info: 'Meet & Greet service', phone: '+234 800 000 0104' },
    { name: 'SkyBridge Mobility', info: 'Group shuttles available', phone: '+234 800 000 0105' },
  ];

  const fleetPartners = [
    { name: 'MetroFleet', info: 'Hourly/Day rentals', phone: '+234 800 000 0201' },
    { name: 'UrbanDrive', info: 'Business class sedans', phone: '+234 800 000 0202' },
    { name: 'RoadRunner', info: 'SUVs & Minivans', phone: '+234 800 000 0203' },
    { name: 'CityCruise', info: 'Driver-on-demand', phone: '+234 800 000 0204' },
    { name: 'PrimeMotion', info: 'Corporate fleets', phone: '+234 800 000 0205' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Reservation</h1>
          <p className="text-white/90 max-w-2xl">Book accommodation and transportation for a smooth Abuja Detty December experience.</p>
        </div>
      </section>

      {/* Accommodation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Accommodation</h2>

        {/* Hotels (5) */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-4">
            <Building2 className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Hotels</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((h, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Coming soon</span>
                  <span className="inline-flex items-center text-green-600 text-sm">View <ArrowRight className="w-4 h-4 ml-1" /></span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{h.name}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-2"><MapPin className="w-4 h-4 mr-2" /> {h.location}</div>
                <div className="flex items-center text-sm text-gray-600"><Phone className="w-4 h-4 mr-2" /> {h.phone}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Apartments (5) */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <BedDouble className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Apartments</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((a, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Coming soon</span>
                  <span className="inline-flex items-center text-green-600 text-sm">View <ArrowRight className="w-4 h-4 ml-1" /></span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{a.name}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-2"><MapPin className="w-4 h-4 mr-2" /> {a.location}</div>
                <div className="flex items-center text-sm text-gray-600"><Phone className="w-4 h-4 mr-2" /> {a.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Transportation</h2>

        {/* Airport Pickup (5) */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-4">
            <Plane className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Airport Pickup & Drop-off</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airportPartners.map((p, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Coming soon</span>
                  <span className="inline-flex items-center text-green-600 text-sm">Schedule <ArrowRight className="w-4 h-4 ml-1" /></span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{p.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{p.info}</p>
                <div className="flex items-center text-sm text-gray-600"><Phone className="w-4 h-4 mr-2" /> {p.phone}</div>
              </div>
            ))}
          </div>
        </div>

        {/* City Fleet (5) */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Car className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">City Fleet (Move Around)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetPartners.map((p, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Coming soon</span>
                  <span className="inline-flex items-center text-green-600 text-sm">Book <ArrowRight className="w-4 h-4 ml-1" /></span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{p.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{p.info}</p>
                <div className="flex items-center text-sm text-gray-600"><Phone className="w-4 h-4 mr-2" /> {p.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
