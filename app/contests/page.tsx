'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContestsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/events?category=Contests');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <p className="text-gray-700 mb-4">Redirecting to contests...</p>
        <a href="/events?category=Contests" className="text-green-600 hover:text-green-700 font-medium underline">Go to Contests</a>
      </div>
    </div>
  );
}
