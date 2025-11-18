'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

interface Sponsor {
  _id?: string;
  name: string;
  logo?: string;
  tier?: string;
  website?: string;
}

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch(`${API_URL}/sponsors`);
        const data = await res.json();
        if (data.success && data.data) {
          setSponsors(data.data);
        }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
    };
    fetchSponsors();
  }, []);

  // Helper to get initial for fallback logo
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  // Render logo from data
  const renderLogo = (sponsor: Sponsor) => {
    if (sponsor.logo) {
      return (
        <Image
          src={sponsor.logo.startsWith('/') ? sponsor.logo : `/sponsors/${sponsor.logo}`}
          alt={sponsor.name}
          width={100}
          height={100}
          className="w-16 h-16 object-contain"
        />
      );
    }
    // Fallback to initial
    return (
      <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-3">
        <div className="text-white text-2xl font-bold">{getInitial(sponsor.name)}</div>
      </div>
    );
  };

  // Fallback sponsors if no data from backend
  const fallbackSponsors: Sponsor[] = [
    { name: "Abuja Continental Hotel", logo: "AC.png" },
    { name: "Brave ICONS", logo: "BRAVEICONS.png" },
    { name: "Kyros Automobile", logo: "KYROS.png" },
    { name: "PFIPC", logo: "PFIPC.png" },
    { name: "World Trade Center", logo: "WTC.png" },
    { name: "Abuja", logo: "Abuja.jpg" },
    { name: "MTN Nigeria" },
    { name: "GTBank" },
    { name: "Zenith Bank" },
    { name: "Access Bank" },
    { name: "Dangote Group" },
    { name: "Shoprite" }
  ];

  // Use real sponsors if available, otherwise fallback
  const displaySponsors = sponsors.length > 0 ? sponsors : fallbackSponsors;

  // Duplicate sponsors for seamless scroll
  const duplicatedSponsors = [...displaySponsors, ...displaySponsors];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Escape to Abuja */}
        <div className='text-center mb-16'>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Escape to Abuja
          </h2>

          {/* Buttons */}
          <div className="flex justify-center space-x-6">
            <a
              href="/diaspora"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
            >
              Diaspora Tickets
            </a>
          </div>
        </div>

        {/* Stylish Divider */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-xs h-1 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl text-gray-700 mb-2">Proudly sponsored by</h2>
        </div>

        {/* Scrolling Sponsor Logos */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-12">
              {duplicatedSponsors.map((sponsor, index) => (
                <div
                  key={`${sponsor.name}-${index}`}
                  className="flex flex-col items-center bg-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  {renderLogo(sponsor)}
                  <div className="text-sm text-gray-600 font-serif mt-2">{sponsor.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}