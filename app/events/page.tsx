'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Calendar, MapPin, Users, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
// Layout (Navigation/Footer) provided globally by ConditionalLayout

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

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Updated categories per spec
  const categories = ['All Events', 'Contests', 'Concerts', 'Parties', 'Carnival', 'Food', 'Workshop'];

  // Custom contests content (graphical)
  const contestsContent = [
    {
      id: 'ct1',
      title: 'ADD 2025 FunSports Tournament',
      image: '/events/about.jpg',
      description:
        'In partnership with the sports commission and Abuja sports community, we present the ADD 2025 Fun Sports Tournament: Play-for-Peace & Prosperity featuring competition in basketball, volleyball, soccer, tennis etc.'
    },
    {
      id: 'ct2',
      title: 'ADD Height of the Hike Challenge',
      image: '/background/background6.png',
      description:
        'In partnership with Abuja’s premier hiking group, we present an integrated hiking and treasure hunt challenge for the brave men and women competing to conquer Abuja’s beautiful mountains and rocky terrains. Grand finale at the City Gate Mountain.'
    },
    {
      id: 'ct3',
      title: 'ADD 2025 On-the-Clock Raffle Draw',
      image: '/events/food.png',
      description:
        'On the hour, every hour, someone will win a Prize at the ADD 2025 ‘On-the-Clock’ Raffle Draw happening LIVE at the ADD Village. Feel the ecstasy, join the celebration. Buy your raffle tickets here and win BIG too!'
    },
    {
      id: 'ct4',
      title: 'Capital City Christmas Carol Challenge',
      image: '/events/Miss.png',
      description:
        'Bring it on! Talents, skills and grace. Watch the Christian community and church choirs slug it out at the Capital City Christmas Carol organized by our experienced delivery partner.'
    },
    {
      id: 'ct5',
      title: 'ADD Village Games',
      image: '/events/concert.png',
      description:
        'LIVE at the ADD Village. Join the fun, play the games, make new friends, inspire your fans and win something for your loved ones.'
    }
  ];

  // Map existing event categories to the new canonical categories
  const mapCategory = (cat: string): string => {
    switch (cat.toLowerCase()) {
      case 'comedy':
        return 'Contests';
      case 'contest':
        return 'Contests';
      case 'concert':
      case 'concerts':
        return 'Concerts';
      case 'cultural':
      case 'festival':
        return 'Carnival';
      case 'dance':
        return 'Parties';
      case 'food':
        return 'Food';
      case 'workshop':
        return 'Workshop';
      default:
        return cat;
    }
  };

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events`);
        const data = await res.json();
        if (data.success && data.data) {
          setEvents(data.data.map((e: any) => ({ ...e, id: e._id || e.id })));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Initialize selected category from query param
  useEffect(() => {
    const cat = searchParams?.get('category');
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fallback sample events data (when backend is empty)
  const sampleEvents: Event[] = [
    // Concert Events
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
      title: 'Gospel Concert',
      category: 'Concert',
      date: 'Sunday, December 22, 2025',
      location: 'National Stadium Abuja',
      capacity: 8000,
      description: 'Inspirational gospel music concert with renowned artists',
      image: '/background/background3.png',
      price: '₦8,000'
    },
    {
      id: '4',
      title: 'Hip Hop Showcase',
      category: 'Concert',
      date: 'Wednesday, December 25, 2025',
      location: 'Sheraton Hotel Abuja',
      capacity: 2000,
      description: 'Nigeria\'s finest hip hop artists performing live',
      image: '/background/background4.png',
      price: '₦10,000'
    },
    {
      id: '5',
      title: 'Reggae Night',
      category: 'Concert',
      date: 'Saturday, December 28, 2025',
      location: 'Abuja Continental Hotel',
      capacity: 1500,
      description: 'One love, one heart - reggae music celebration',
      image: '/background/background5.png',
      price: '₦7,500'
    },

    // Comedy Events
    {
      id: '6',
      title: 'Stand-up Comedy Night',
      category: 'Comedy',
      date: 'Tuesday, December 16, 2025',
      location: 'Transcorp Hilton Abuja',
      capacity: 800,
      description: 'Laugh your heart out with Nigeria\'s top comedians',
      image: '/background/background6.png',
      price: '₦5,000'
    },
    {
      id: '7',
      title: 'Comedy Central Live',
      category: 'Comedy',
      date: 'Thursday, December 19, 2025',
      location: 'Abuja Continental Hotel',
      capacity: 1200,
      description: 'An evening of hilarious stand-up comedy performances',
      image: '/background/background1.png',
      price: '₦6,500'
    },
    {
      id: '8',
      title: 'Laugh Out Loud',
      category: 'Comedy',
      date: 'Saturday, December 21, 2025',
      location: 'Sheraton Hotel Abuja',
      capacity: 1000,
      description: 'Comedy show featuring both established and upcoming comedians',
      image: '/background/background2.png',
      price: '₦4,500'
    },
    {
      id: '9',
      title: 'Comedy Roast Night',
      category: 'Comedy',
      date: 'Monday, December 23, 2025',
      location: 'Abuja International Conference Centre',
      capacity: 600,
      description: 'Roast comedy night with celebrity guests',
      image: '/background/background3.png',
      price: '₦8,000'
    },
    {
      id: '10',
      title: 'Family Comedy Show',
      category: 'Comedy',
      date: 'Friday, December 27, 2025',
      location: 'National Stadium Abuja',
      capacity: 2000,
      description: 'Clean comedy suitable for the whole family',
      image: '/background/background4.png',
      price: '₦3,500'
    },

    // Cultural Events
    {
      id: '11',
      title: 'Cultural Festival',
      category: 'Cultural',
      date: 'Thursday, December 18, 2025',
      location: 'Transcorp Hilton Abuja',
      capacity: 3000,
      description: 'Celebrating Nigerian culture with food, music, and art',
      image: '/background/background5.png',
      price: '₦10,000'
    },
    {
      id: '12',
      title: 'Traditional Dance Showcase',
      category: 'Cultural',
      date: 'Sunday, December 21, 2025',
      location: 'Abuja Continental Hotel',
      capacity: 1500,
      description: 'Traditional dances from all Nigerian states',
      image: '/background/background6.png',
      price: '₦7,500'
    },
    {
      id: '13',
      title: 'Art & Craft Exhibition',
      category: 'Cultural',
      date: 'Wednesday, December 24, 2025',
      location: 'Abuja International Conference Centre',
      capacity: 1000,
      description: 'Showcasing Nigerian arts, crafts, and cultural artifacts',
      image: '/background/background1.png',
      price: '₦5,000'
    },
    {
      id: '14',
      title: 'Cultural Food Festival',
      category: 'Cultural',
      date: 'Saturday, December 26, 2025',
      location: 'National Stadium Abuja',
      capacity: 4000,
      description: 'Taste authentic Nigerian cuisine from different regions',
      image: '/background/background2.png',
      price: '₦8,500'
    },
    {
      id: '15',
      title: 'Heritage Day Celebration',
      category: 'Cultural',
      date: 'Tuesday, December 30, 2025',
      location: 'Sheraton Hotel Abuja',
      capacity: 2500,
      description: 'Celebrating Nigeria\'s rich cultural heritage',
      image: '/background/background3.png',
      price: '₦9,000'
    },

    // Dance Events
    {
      id: '16',
      title: 'Dance Battle Championship',
      category: 'Dance',
      date: 'Friday, December 17, 2025',
      location: 'Transcorp Hilton Abuja',
      capacity: 2000,
      description: 'Ultimate dance battle with cash prizes',
      image: '/background/background4.png',
      price: '₦12,000'
    },
    {
      id: '17',
      title: 'Contemporary Dance Show',
      category: 'Dance',
      date: 'Monday, December 22, 2025',
      location: 'Abuja Continental Hotel',
      capacity: 800,
      description: 'Modern contemporary dance performances',
      image: '/background/background5.png',
      price: '₦6,000'
    },
    {
      id: '18',
      title: 'Street Dance Competition',
      category: 'Dance',
      date: 'Thursday, December 25, 2025',
      location: 'Abuja International Conference Centre',
      capacity: 1500,
      description: 'Street dance styles competition',
      image: '/background/background6.png',
      price: '₦8,500'
    },
    {
      id: '19',
      title: 'Ballroom Dance Night',
      category: 'Dance',
      date: 'Sunday, December 28, 2025',
      location: 'Sheraton Hotel Abuja',
      capacity: 600,
      description: 'Elegant ballroom dancing with live orchestra',
      image: '/background/background1.png',
      price: '₦15,000'
    },
    {
      id: '20',
      title: 'Afro Dance Workshop',
      category: 'Dance',
      date: 'Wednesday, December 31, 2025',
      location: 'National Stadium Abuja',
      capacity: 1000,
      description: 'Learn traditional and modern Afro dance moves',
      image: '/background/background2.png',
      price: '₦4,000'
    },

    // Food Events
    {
      id: '21',
      title: 'Nigerian Food Festival',
      category: 'Food',
      date: 'Saturday, December 14, 2025',
      location: 'Transcorp Hilton Abuja',
      capacity: 3000,
      description: 'Taste authentic Nigerian dishes from all regions',
      image: '/background/background3.png',
      price: '₦8,000'
    },
    {
      id: '22',
      title: 'Chef Competition',
      category: 'Food',
      date: 'Tuesday, December 17, 2025',
      location: 'Abuja Continental Hotel',
      capacity: 500,
      description: 'Watch top chefs compete in cooking challenges',
      image: '/background/background4.png',
      price: '₦12,500'
    },
    {
      id: '23',
      title: 'Street Food Market',
      category: 'Food',
      date: 'Friday, December 20, 2025',
      location: 'Abuja International Conference Centre',
      capacity: 2000,
      description: 'Explore diverse street food from across Nigeria',
      image: '/background/background5.png',
      price: '₦5,000'
    },
    {
      id: '24',
      title: 'Wine & Dine Experience',
      category: 'Food',
      date: 'Monday, December 23, 2025',
      location: 'Sheraton Hotel Abuja',
      capacity: 300,
      description: 'Fine dining experience with wine pairing',
      image: '/background/background6.png',
      price: '₦25,000'
    },
    {
      id: '25',
      title: 'Cooking Masterclass',
      category: 'Food',
      date: 'Thursday, December 26, 2025',
      location: 'National Stadium Abuja',
      capacity: 800,
      description: 'Learn cooking techniques from master chefs',
      image: '/background/background1.png',
      price: '₦7,500'
    },

    // Workshop Events
    {
      id: '26',
      title: 'Music Production Workshop',
      category: 'Workshop',
      date: 'Sunday, December 15, 2025',
      location: 'Transcorp Hilton Abuja',
      capacity: 200,
      description: 'Learn music production from industry professionals',
      image: '/background/background2.png',
      price: '₦15,000'
    },
    {
      id: '27',
      title: 'Acting Masterclass',
      category: 'Workshop',
      date: 'Wednesday, December 18, 2025',
      location: 'Abuja Continental Hotel',
      capacity: 150,
      description: 'Acting techniques and performance skills workshop',
      image: '/background/background3.png',
      price: '₦12,000'
    },
    {
      id: '28',
      title: 'Photography Workshop',
      category: 'Workshop',
      date: 'Saturday, December 21, 2025',
      location: 'Abuja International Conference Centre',
      capacity: 100,
      description: 'Professional photography techniques and editing',
      image: '/background/background4.png',
      price: '₦10,000'
    },
    {
      id: '29',
      title: 'Digital Marketing Seminar',
      category: 'Workshop',
      date: 'Tuesday, December 24, 2025',
      location: 'Sheraton Hotel Abuja',
      capacity: 300,
      description: 'Digital marketing strategies for businesses',
      image: '/background/background5.png',
      price: '₦8,500'
    },
    {
      id: '30',
      title: 'Entrepreneurship Bootcamp',
      category: 'Workshop',
      date: 'Friday, December 27, 2025',
      location: 'National Stadium Abuja',
      capacity: 500,
      description: 'Start your business journey with expert guidance',
      image: '/background/background6.png',
      price: '₦20,000'
    },

    // Additional events to reach 35 total
    {
      id: '31',
      title: 'Abuja Detty December Festival 2025',
      category: 'Festival',
      date: 'Saturday, December 20, 2025',
      location: 'Transcorp Hilton Abuja',
      capacity: 2000,
      description: 'The biggest December celebration in Abuja! Join us for an unforgettable night of music, dance, and entertainment',
      image: '/background/background1.png',
      price: '₦18,000'
    },
    {
      id: '32',
      title: 'New Year Countdown Party',
      category: 'Festival',
      date: 'Tuesday, December 31, 2025',
      location: 'Abuja Continental Hotel',
      capacity: 5000,
      description: 'Ring in the new year with spectacular celebrations',
      image: '/background/background2.png',
      price: '₦20,000'
    },
    {
      id: '33',
      title: 'Christmas Carol Night',
      category: 'Festival',
      date: 'Monday, December 22, 2025',
      location: 'Abuja International Conference Centre',
      capacity: 3000,
      description: 'Traditional Christmas carols and festive celebrations',
      image: '/background/background3.png',
      price: '₦6,000'
    },
    {
      id: '34',
      title: 'Youth Empowerment Summit',
      category: 'Workshop',
      date: 'Thursday, December 19, 2025',
      location: 'National Stadium Abuja',
      capacity: 2000,
      description: 'Empowering Nigerian youth with skills and opportunities',
      image: '/background/background4.png',
      price: '₦5,000'
    },
    {
      id: '35',
      title: 'Fashion Show Extravaganza',
      category: 'Cultural',
      date: 'Sunday, December 29, 2025',
      location: 'Sheraton Hotel Abuja',
      capacity: 1500,
      description: 'Showcasing Nigerian fashion designers and models',
      image: '/background/background5.png',
      price: '₦12,500'
    }
  ];

  // Use real events if available, otherwise fallback to sample
  const displayEvents = events.length > 0 ? events : sampleEvents;

  const filteredEvents = useMemo(() => {
    return displayEvents.filter(event => {
      const canonical = mapCategory(event.category);
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Events' || canonical === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [displayEvents, searchTerm, selectedCategory]);

  const EventCard = ({ event }: { event: Event }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden relative">
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {mapCategory(event.category)}
        </span>
      </div>

      {/* Event Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={getImageUrl(event.image)}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/background/background1.png';
          }}
        />
      </div>

      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.capacity.toLocaleString()} capacity</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">{event.price}</span>
          {event.category === 'Contest' ? (
            <Link
              href="/vote"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Vote Now
            </Link>
          ) : (
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              View Details & Tickets
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const EventListItem = ({ event }: { event: Event }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex items-center space-x-6">
      {/* Event Image */}
      <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
        <img
          src={getImageUrl(event.image)}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/background/background1.png';
          }}
        />
      </div>

      {/* Event Details */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium mr-3">
              {mapCategory(event.category)}
            </span>
            <h3 className="text-lg font-bold text-gray-900 inline">{event.title}</h3>
          </div>
          <span className="text-lg font-bold text-green-600">{event.price}</span>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{event.capacity.toLocaleString()} capacity</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4">{event.description}</p>

        {event.category === 'Contest' ? (
          <Link
            href="/vote"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Vote Now
          </Link>
        ) : (
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            View Details & Tickets
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm pt-32 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-gray-600">Discover amazing events happening in Abuja</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-green-600 hover:bg-green-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-green-600 hover:bg-green-50'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-green-600 hover:bg-green-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Results Header */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              {selectedCategory === 'Contests'
                ? `Showing ${contestsContent.length} contests`
                : `Showing ${filteredEvents.length} of ${displayEvents.length} events`}
            </p>
          </div>
        )}

        {/* Contests (custom graphical) or Events */}
        {!loading && (selectedCategory === 'Contests' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contestsContent.map((c) => (
              <div key={c.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{c.description}</p>
                  <a href="/vote" className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium">Vote Now</a>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="relative">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
          </div>
        ))}

        {/* No Results */}
        {!loading && filteredEvents.length === 0 && selectedCategory !== 'Contests' && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Events');
              }}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}