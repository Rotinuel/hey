'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically send the email to your backend
      console.log('Subscribed email:', email);
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Stay Updated with ADD 2025
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get the latest news, exclusive offers, and behind-the-scenes content delivered straight to your inbox.
          </p>
        </div>

        {/* Newsletter Form */}
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold">
              Thank you for subscribing! Check your email for confirmation.
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <p className="text-gray-400 text-sm mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}













