'use client';

import { useState, useEffect } from 'react';
import { Play, Image as ImageIcon, Video, Users, Camera, Download, Eye } from 'lucide-react';
// Layout provided globally

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

interface GalleryItem {
  id: string;
  _id?: string;
  title: string;
  thumbnail?: string;
  image?: string;
  type: 'video' | 'photo' | 'performance' | 'behind-scenes';
  views?: number;
  date: string;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_URL}/gallery`);
        const data = await res.json();
        if (data.success && data.data) {
          setGalleryItems(data.data.map((item: any) => ({
            ...item,
            id: item._id || item.id,
            thumbnail: item.image || item.thumbnail || '/background/background1.png'
          })));
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = [
    { id: 'all', name: 'All', icon: Eye },
    { id: 'video', name: 'Videos', icon: Video },
    { id: 'photo', name: 'Photos', icon: ImageIcon },
    { id: 'performance', name: 'Performances', icon: Users },
    { id: 'behind-scenes', name: 'Behind Scenes', icon: Camera }
  ];

  // Fallback gallery items if no data from backend
  const fallbackItems: GalleryItem[] = [
    // Videos
    {
      id: 'video-1',
      title: 'Opening Concert Highlights 2024',
      thumbnail: '/background/background1.png',
      type: 'video',
      views: 12500,
      date: 'December 15, 2024'
    },
    {
      id: 'video-2',
      title: 'Cultural Carnival Showcase',
      thumbnail: '/background/background2.png',
      type: 'video',
      views: 9800,
      date: 'December 18, 2024'
    },
    {
      id: 'video-3',
      title: 'Miss ADD Finals Full Replay',
      thumbnail: '/background/background3.png',
      type: 'video',
      views: 15200,
      date: 'December 20, 2024'
    },
    {
      id: 'video-4',
      title: 'Best Moments Compilation',
      thumbnail: '/background/background4.png',
      type: 'video',
      views: 23400,
      date: 'December 22, 2024'
    },
    {
      id: 'video-5',
      title: 'Closing Ceremony Performance',
      thumbnail: '/background/background5.png',
      type: 'video',
      views: 18700,
      date: 'December 31, 2024'
    },

    // Photos
    {
      id: 'photo-1',
      title: 'Concert Crowd Shot',
      thumbnail: '/background/background6.png',
      type: 'photo',
      views: 5600,
      date: 'December 15, 2024'
    },
    {
      id: 'photo-2',
      title: 'Stage Performance',
      thumbnail: '/background/background1.png',
      type: 'photo',
      views: 4200,
      date: 'December 16, 2024'
    },
    {
      id: 'photo-3',
      title: 'Vendor Showcase',
      thumbnail: '/background/background2.png',
      type: 'photo',
      views: 3800,
      date: 'December 17, 2024'
    },
    {
      id: 'photo-4',
      title: 'Festival Goers',
      thumbnail: '/background/background3.png',
      type: 'photo',
      views: 5100,
      date: 'December 18, 2024'
    },
    {
      id: 'photo-5',
      title: 'Sunset View',
      thumbnail: '/background/background4.png',
      type: 'photo',
      views: 6900,
      date: 'December 19, 2024'
    },

    // Performances
    {
      id: 'performance-1',
      title: 'Traditional Dance Performance',
      thumbnail: '/background/background5.png',
      type: 'performance',
      views: 3100,
      date: 'December 18, 2024'
    },
    {
      id: 'performance-2',
      title: 'Afrobeat Live Band',
      thumbnail: '/background/background6.png',
      type: 'performance',
      views: 4700,
      date: 'December 19, 2024'
    },
    {
      id: 'performance-3',
      title: 'Dance Battle Finals',
      thumbnail: '/background/background1.png',
      type: 'performance',
      views: 5200,
      date: 'December 20, 2024'
    },
    {
      id: 'performance-4',
      title: 'Gospel Choir Performance',
      thumbnail: '/background/background2.png',
      type: 'performance',
      views: 3800,
      date: 'December 21, 2024'
    },
    {
      id: 'performance-5',
      title: 'Hip Hop Showcase',
      thumbnail: '/background/background3.png',
      type: 'performance',
      views: 4500,
      date: 'December 22, 2024'
    },

    // Behind the Scenes
    {
      id: 'behind-1',
      title: 'Event Setup & Preparation',
      thumbnail: '/background/background4.png',
      type: 'behind-scenes',
      views: 2800,
      date: 'December 14, 2024'
    },
    {
      id: 'behind-2',
      title: 'Backstage Moments',
      thumbnail: '/background/background5.png',
      type: 'behind-scenes',
      views: 3400,
      date: 'December 15, 2024'
    },
    {
      id: 'behind-3',
      title: 'Artist Arrival',
      thumbnail: '/background/background6.png',
      type: 'behind-scenes',
      views: 2600,
      date: 'December 16, 2024'
    },
    {
      id: 'behind-4',
      title: 'Sound Check & Rehearsal',
      thumbnail: '/background/background1.png',
      type: 'behind-scenes',
      views: 2200,
      date: 'December 17, 2024'
    },
    {
      id: 'behind-5',
      title: 'Team Coordination',
      thumbnail: '/background/background2.png',
      type: 'behind-scenes',
      views: 1900,
      date: 'December 18, 2024'
    }
  ];

  // Use real gallery items if available, otherwise fallback
  const displayItems = galleryItems.length > 0 ? galleryItems : fallbackItems;

  const filteredItems = selectedCategory === 'all' 
    ? displayItems 
    : displayItems.filter(item => item.type === selectedCategory);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return displayItems.length;
    return displayItems.filter(item => item.type === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and content */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 pt-32 md:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Gallery
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Relive the unforgettable moments from Abuja Detty December 2024
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.name}</span>
                <span className={`text-sm ${
                  selectedCategory === category.id ? 'text-green-100' : 'text-gray-500'
                }`}>
                  ({getCategoryCount(category.id)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {item.type === 'video' ? (
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-12 h-12 text-white" fill="white" />
                    </div>
                  ) : (
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Eye className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                    {item.type.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{item.date}</span>
                  {item.views && (
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views.toLocaleString()}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No items found in this category</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="relative">
              <img
                src={selectedItem.thumbnail}
                alt={selectedItem.title}
                className="w-full h-auto"
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium capitalize">
                    {selectedItem.type.replace('-', ' ')}
                  </span>
                  {selectedItem.views && (
                    <span className="text-gray-600 flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>{selectedItem.views.toLocaleString()} views</span>
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedItem.title}
                </h2>
                <p className="text-gray-600 mb-4">{selectedItem.date}</p>

                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    {selectedItem.type === 'video' ? (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Watch Video</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                  <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
                    <Eye className="w-5 h-5" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}




