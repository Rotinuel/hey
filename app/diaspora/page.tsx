'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plane, Globe2, ShieldCheck, CalendarHeart, Users, Gift, MapPin } from 'lucide-react';

// Local images for visual pop
const heroImages = [
  '/ADD%20FAMILY%20FUN%20FAIR%202.png',
  '/ADD%20XMAS%20VILLAGE%202.png',
  '/Gemini_Generated_Image_20mhw920mhw920mh.png',
  '/Gemini_Generated_Image_jlpfmijlpfmijlpf.png',
  '/Gemini_Generated_Image_5dqyqm5dqyqm5dqy.png',
];

export default function DiasporaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with background image and overlay */}
      <section className="relative w-full min-h-[400px] flex items-center justify-center pt-32 md:pt-40">
        <div className="absolute inset-0">
          <Image src={heroImages[0]} alt="Happy family at ADD" fill style={{ objectFit: 'cover' }} className="z-0" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-red-700/70 via-yellow-500/60 to-green-600/60 mix-blend-multiply z-10" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto px-5 py-24 text-center text-white flex flex-col items-center backdrop-blur-sm rounded-2xl bg-black/20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg mb-5 animate-fade-up">Experience<br /><span className="bg-gradient-to-r from-yellow-300 via-red-500 to-green-400 bg-clip-text text-transparent">Abuja Detty December</span><br /><span className="text-xl font-light mt-4 block opacity-90">Homecoming Like No Other</span></h1>
          <p className="text-white text-lg max-w-xl mx-auto mb-7 drop-shadow-lg animate-fade-up animate-delay-100">Fly home to a world-class celebration in Nigeria’s capital city. Premium concerts, vibrant Afrobeats, safe family fun, luxury logistics — all planned for a seamless &amp; premium homecoming.</p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-up animate-delay-200">
            <Link href="/raffle" className="bg-white text-red-700 hover:bg-yellow-300 hover:text-black px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-200 text-lg">Get Access &amp; Raffle</Link>
            <Link href="/reservation" className="bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-300 hover:to-green-300 text-gray-900 px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-200 text-lg">Reserve Stay &amp; Transport</Link>
          </div>
        </div>
        {/* swirling confetti effect with another image as corner art (for energy) */}
        <div className="absolute top-0 right-0 w-1/3 max-w-md hidden md:block opacity-90 animate-pulse-slow">
          <Image src={heroImages[3]} alt="Miss ADD" width={400} height={260} className="rounded-bl-3xl shadow-2xl border-4 border-white/70" />
        </div>
      </section>

      {/* Why Abuja ADD -- colorful cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center text-green-700 drop-shadow">Why <span className="text-red-500">Abuja?</span> Why <span className="text-yellow-500">ADD?</span></h2>
          <p className="text-gray-800 text-lg max-w-2xl text-center">Nigeria’s heartland — clean, secure, accessible. ADD is the December every returnee dreams of. More smiles, more adventure, more comfort than you imagined.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          <div className="bg-gradient-to-br from-yellow-100 via-red-100 to-green-100 rounded-2xl shadow-xl p-7 border-t-4 border-yellow-400 flex flex-col items-center">
            <div className="flex items-center mb-4"><MapPin className="w-8 h-8 text-red-500 mr-2" /><h3 className="text-xl font-bold">The Capital Advantage</h3></div>
            <p className="text-gray-700 text-base">Abuja is Nigeria’s capital — safe, easy to access, and full of friendly vibes. Enjoy peace of mind while you party and explore.</p>
          </div>
          <div className="bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 rounded-2xl shadow-xl p-7 border-t-4 border-red-400 flex flex-col items-center">
            <div className="flex items-center mb-4"><Users className="w-8 h-8 text-green-600 mr-2" /><h3 className="text-xl font-bold">Incredible Scale</h3></div>
            <p className="text-gray-700 text-base">5,000+ daily visitors. 500+ volunteers. 250M+ impressions. 300+ trade fair stores. The biggest December ever in Naija.</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 rounded-2xl shadow-xl p-7 border-t-4 border-green-400 flex flex-col items-center">
            <div className="flex items-center mb-4"><ShieldCheck className="w-8 h-8 text-yellow-400 mr-2" /><h3 className="text-xl font-bold">Safe &amp; Secure</h3></div>
            <p className="text-gray-700 text-base">Curated events, verified partners, airport pickup, city fleets, and the friendliest staff you’ll ever meet. Pure peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Events/Stories visual collage section */}
      <section className="py-10 bg-gradient-to-b from-white via-yellow-50 to-red-50">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="w-full flex flex-wrap items-center gap-6 justify-center">
            <div className="rounded-3xl overflow-hidden shadow-xl w-72 h-56 relative">
              <Image src={heroImages[1]} alt="Festive 2025 fair" fill style={{ objectFit: 'cover' }} className="" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl w-60 h-56 relative hidden md:block border-4 border-yellow-300">
              <Image src={heroImages[4]} alt="ADD Hike" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl w-64 h-56 relative border-4 border-white">
              <Image src={heroImages[2]} alt="Award night" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl w-80 h-56 relative border-4 border-yellow-300 hidden lg:block">
              <Image src={heroImages[0]} alt="Family Fun" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="absolute -top-4 left-0 bg-yellow-300/30 w-80 h-20 rounded-full blur-2xl opacity-70 hidden md:block" />
          <div className="absolute bottom-0 right-0 bg-red-200/40 w-80 h-20 rounded-full blur-2xl opacity-60 hidden md:block" />
        </div>
      </section>

      {/* What You Get Section - lively cards */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight drop-shadow">Your <span className="text-red-500">ADD</span> Homecoming Package</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border-t-4 border-yellow-400 bg-yellow-50/90 p-7 shadow-lg">
              <div className="flex items-center mb-3"><CalendarHeart className="w-7 h-7 text-red-500 mr-2" /><h3 className="font-semibold">12-Day Access</h3></div>
              <p className="text-gray-800 text-base">Pass to ADD Village: concerts, contests, food, fashion, friends &amp; family.</p>
            </div>
            <div className="rounded-2xl border-t-4 border-green-400 bg-green-50/90 p-7 shadow-lg">
              <div className="flex items-center mb-3"><Globe2 className="w-7 h-7 text-green-600 mr-2" /><h3 className="font-semibold">Diaspora Concierge</h3></div>
              <p className="text-gray-800 text-base">Airport pickup, local SIM, lounges, full support for our returnees.</p>
            </div>
            <div className="rounded-2xl border-t-4 border-pink-400 bg-red-50/80 p-7 shadow-lg">
              <div className="flex items-center mb-3"><Gift className="w-7 h-7 text-yellow-400 mr-2" /><h3 className="font-semibold">VIP Perks</h3></div>
              <p className="text-gray-800 text-base">VIP lanes, daily raffles &amp; prizes, Zuma Rock tours, premium discounts.</p>
            </div>
            <div className="rounded-2xl border-t-4 border-red-400 bg-red-50/80 p-7 shadow-lg">
              <div className="flex items-center mb-3"><Users className="w-7 h-7 text-red-500 mr-2" /><h3 className="font-semibold">Diaspora Community</h3></div>
              <p className="text-gray-800 text-base">Meet fellow returnees, join business mixers, and reconnect with home.</p>
            </div>
            <div className="rounded-2xl border-t-4 border-orange-400 bg-yellow-50/90 p-7 shadow-lg">
              <div className="flex items-center mb-3"><Plane className="w-7 h-7 text-orange-500 mr-2" /><h3 className="font-semibold">Hotel &amp; Flight Flexibility</h3></div>
              <p className="text-gray-800 text-base">Stay in style — top hotels/apartments in prime Abuja neighborhoods.</p>
            </div>
            <div className="rounded-2xl border-t-4 border-green-400 bg-green-50/90 p-7 shadow-lg">
              <div className="flex items-center mb-3"><ShieldCheck className="w-7 h-7 text-green-600 mr-2" /><h3 className="font-semibold">Verified &amp; Secure</h3></div>
              <p className="text-gray-800 text-base">All partners are trusted. Security, comfort, and fun — all in one ticket.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - bolder and more festive */}
      <section className="bg-gradient-to-br from-yellow-300 via-red-400 to-green-500 text-white relative">
        <div className="absolute inset-0 opacity-15 mix-blend-lighten">
          <Image src={heroImages[2]} alt="Award stage" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-2 drop-shadow-xl">Ready for your most colorful December?</h3>
              <p className="text-white/90 text-lg">Secure your all-access pass, reserve your travel, and come party like royalty.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/raffle" className="bg-white text-red-600 hover:bg-yellow-300 hover:text-black px-7 py-4 rounded-xl font-bold shadow-lg text-lg transition-all">Get Access & Raffle</Link>
              <Link href="/reservation" className="bg-black/30 hover:bg-white hover:text-red-700 text-white px-7 py-4 rounded-xl font-bold shadow-lg text-lg transition-all">Reserve Stay/Transport</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
