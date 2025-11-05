'use client';

import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

interface ContestCardProps {
  title: string;
  category: string;
  description: string;
  onParticipate: () => void;
}

function ContestCard({ title, category, description, onParticipate }: ContestCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative">
      {/* Trophy Icon */}
      <div className="absolute top-4 right-4">
        <Trophy className="w-8 h-8 text-red-500" />
      </div>
      
      {/* Content */}
      <div className="pr-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="text-green-600 text-sm font-medium mb-4">{category}</div>
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
        <button
          onClick={onParticipate}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Participate
        </button>
      </div>
    </div>
  );
}

export default function ContestShowcase() {
  const [contests, setContests] = useState<any[]>([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await fetch(`${API_URL}/contests`);
        const data = await res.json();
        if (data.success && data.data) {
          setContests(data.data.slice(0, 2));
        }
      } catch (error) {
        console.error('Error fetching contests:', error);
      }
    };
    fetchContests();
  }, []);

  const fallbackContests = [
    {
      title: "Cultural Carnival Showcase",
      category: "Carnival",
      description: "States, communities, and cultural groups showcase their heritage through elaborate costumes, traditional dances, and cultural presentations. Celebrating the diversity and beauty of Nigerian culture.",
      onParticipate: () => console.log("Participate in Cultural Carnival Showcase")
    },
    {
      title: "Miss Abuja Detty December 2025",
      category: "MissADD",
      description: "The premier beauty pageant celebrating Nigerian women. Contestants compete in traditional wear, evening gown, talent, and Q&A segments. Winner receives #5M cash prize, brand ambassadorships, and international pageant opportunities.",
      onParticipate: () => console.log("Participate in Miss Abuja Detty December")
    }
  ];

  const displayContests = contests.length > 0 ? contests.map((c: any) => ({
    title: c.title,
    category: c.category,
    description: c.description,
    onParticipate: () => window.location.href = "/vote"
  })) : fallbackContests;

  return (
    <section id="competitions" className="py-20 bg-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Join the Competition
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Show off your talents and compete for amazing prizes in our exciting contests.
          </p>
        </div>

        {/* Contest Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {displayContests.map((contest, index) => (
            <ContestCard
              key={index}
              title={contest.title}
              category={contest.category}
              description={contest.description}
              onParticipate={contest.onParticipate}
            />
          ))}
        </div>

        {/* View All Contests Button */}
        <div className="text-center">
          <a href="/events?category=Contests" className="inline-block bg-green-800 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            View All Contests
          </a>
        </div>
      </div>
    </section>
  );
}





