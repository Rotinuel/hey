'use client';

import { Sparkles, Trophy, Shield } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="text-center p-8">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-700 leading-relaxed max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
}

export default function WhyChooseSection() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
      title: 'The Capital Advantage',
      description: 'Abuja is the capital city and seat of government, a melting pot of culture and creativity.'
    },
    {
      icon: <Trophy className="w-8 h-8 text-green-600" />,
      title: 'Incredible Statistics',
      description: '5000+ Daily Visitors, 500+ Volunteers, 250 million+ impressions, 250+ Diaspora Guests, 300+ Trade Fair Stores.'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Legacy Impact',
      description: 'We are creating socioeconomic opportunities for youths and women across the FCT metropolis and beyond.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Choose ADD 2025?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}





