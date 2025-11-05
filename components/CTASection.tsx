'use client';

import { Calendar, Trophy } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-green-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Join the Celebration?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Don&apos;t miss out on Nigeria&apos;s biggest December celebration. Get your tickets now and be part of history!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="flex items-center space-x-3 bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors border-2 border-green-600">
            <Calendar className="w-6 h-6" />
            <span>Browse Events</span>
          </button>
          
          <button className="flex items-center space-x-3 bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors border-2 border-white">
            <Trophy className="w-6 h-6" />
            <span>Start Voting</span>
          </button>
        </div>
      </div>
    </section>
  );
}
