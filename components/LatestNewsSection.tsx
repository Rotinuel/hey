'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

interface NewsCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
}

interface News {
  _id?: string;
  title: string;
  category: string;
  content: string;
  image?: string;
  date: string;
  author?: string;
}

function NewsCard({ image, category, title, description, date }: NewsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-green-600 text-sm font-medium mb-3">{category}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{date}</span>
          <a href="#" className="text-green-600 hover:text-green-700 font-medium text-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LatestNewsSection() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_URL}/news`);
        const data = await res.json();
        if (data.success && data.data) {
          setNews(data.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  // Fallback news if no data from backend
  const newsItems = news.length > 0 ? news.map(n => ({
    image: n.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: n.category,
    title: n.title,
    description: n.content.substring(0, 150) + '...',
    date: n.date
  })) : [
    {
      image: "/news/Grammy.png",
      category: "Entertainment",
      title: "Grammy Nominated Artist Confirmed as Headliner for ADD 2025 Opening Concert",
      description: "Grammy-winning artist will headline the opening concert of Abuja Detty December 2025, promising an unforgettable night of music and entertainment for all attendees.",
      date: "Fri, Dec 22"
    },
    {
      image: "/news/international.png",
      category: "Community",
      title: "International Diaspora Support Reaches All-Time High for ADD 2025",
      description: "Early ticket sales show unprecedented international interest, with diaspora bundle purchases from over 50 countries worldwide, demonstrating the global appeal of Nigerian culture.",
      date: "Fri, Dec 22"
    },
    {
      image: "/news/Miss.png",
      category: "Competition",
      title: "Miss ADD 2025: Journey to Fame Begins!",
      description: "After weeks of intensive competition, five outstanding young women have emerged as finalists for the Miss ADD 2025 crown, each bringing unique talents and cultural pride.",
      date: "Fri, Aug 22"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Latest News
          </h2>
          <p className="text-xl text-gray-700">
            Stay updated with the latest announcements and press coverage.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <NewsCard
              key={index}
              image={news.image}
              category={news.category}
              title={news.title}
              description={news.description}
              date={news.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}






