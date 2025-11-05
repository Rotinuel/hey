'use client';

import { Vote, Trophy, Music, Crown, Camera, ChefHat, Flame } from 'lucide-react';

export default function VotePage() {
  const contests = [
    { id: 'v1', title: 'Miss ADD 2025', desc: 'Vote for your favorite contestant', color: 'from-pink-500 to-rose-500' },
    { id: 'v2', title: 'ADD Music Star', desc: 'Pick the best vocalist and performer', color: 'from-indigo-500 to-purple-500' },
    { id: 'v3', title: 'ADD Dance Battle', desc: 'Choose the most electrifying dancer', color: 'from-orange-500 to-amber-500' },
    { id: 'v4', title: 'Fashion Icon', desc: 'Crown the ultimate style icon', color: 'from-emerald-500 to-green-500' },
    { id: 'v5', title: 'Food MasterChef', desc: 'Select the chef with the best taste', color: 'from-red-500 to-pink-500' },
    { id: 'v6', title: 'Talent Showcase', desc: 'Support the most versatile talent', color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Vote</h1>
          <p className="text-white/90 max-w-2xl">Cast your votes across all Abuja Detty December contests.</p>
        </div>
      </section>

      {/* Contest Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((c) => (
            <div key={c.id} className="rounded-xl shadow bg-white overflow-hidden">
              <div className={`h-28 bg-gradient-to-r ${c.color}`}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{c.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{c.desc}</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                  Vote Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">How voting will work</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Partners will provide official voting APIs.</li>
            <li>Each category will list contestants with photos and bios.</li>
            <li>Votes will be verified and tallied in real-time.</li>
          </ul>
          <p className="text-sm text-gray-500 mt-3">This is a placeholder while we integrate partner services.</p>
        </div>
      </section>
    </div>
  );
}
