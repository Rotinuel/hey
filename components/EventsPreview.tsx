'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://addec-backend.onrender.com';

interface Event {
  id: string;
  _id?: string;
  title: string;
  category: string;
  date: string;
  location: string;
  capacity: number;
  description: string;
  image: string;
  price: string;
}

// Helper function to get proper image URL
const getImageUrl = (image: string): string => {
  if (!image) return '/background/background1.png';
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  if (image.startsWith('/')) {
    // Check if it's already a public path or needs base URL
    if (image.startsWith('/uploads')) {
      return `${BASE_URL}${image}`;
    }
    return image;
  }
  return `${BASE_URL}/uploads/${image}`;
};

export default function EventsPreview() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events`);
        const data = await res.json();
        if (data.success && data.data) {
          setEvents(data.data.slice(0, 3).map((e: any) => ({ ...e, id: e._id || e.id })));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Fallback featured events
  const featuredEvents: Event[] = events.length > 0 ? events : [
    {
      id: '1',
      title: 'Opening Concert 2025',
      category: 'Concert',
      date: 'Monday, December 15, 2025',
      location: 'Transcorp Hilton Abuja',
      capacity: 5000,
      description: 'The grand opening concert featuring top Nigerian artists',
      image: '/background/background1.png',
      price: '₦15,000'
    },
    {
      id: '2',
      title: 'Afrobeat Night',
      category: 'Concert',
      date: 'Friday, December 20, 2025',
      location: 'Abuja International Conference Centre',
      capacity: 3000,
      description: 'An evening of pure Afrobeat music with legendary artists',
      image: '/background/background2.png',
      price: '₦12,000'
    },
    {
      id: '3',
      title: 'Cultural Festival',
      category: 'Cultural',
      date: 'Thursday, December 18, 2025',
      location: 'Transcorp Hilton Abuja',
      capacity: 3000,
      description: 'Celebrating Nigerian culture with food, music, and art',
      image: '/background/background3.png',
      price: '₦10,000'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Unforgettable Events
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            From electrifying concerts to cultural showcases, experience the best of Nigerian entertainment this December.
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredEvents.map((event) => (
            <div key={event.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
              {/* Event Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={getImageUrl(event.image)}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/background/background1.png';
                  }}
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                    {event.price}
                  </span>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">{event.capacity.toLocaleString()} capacity</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 line-clamp-2">
                  {event.description}
                </p>

                {event.category === 'Contest' ? (
                  <Link
                    href="/vote"
                    className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    <span>Vote Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href="/events"
                    className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold group-hover:translate-x-2 transition-transform"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>View All Events</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}