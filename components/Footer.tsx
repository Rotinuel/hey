'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronUp } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [legalPages, setLegalPages] = useState<any[]>([]);

  useEffect(() => {
    const fetchLegalPages = async () => {
      try {
        const res = await fetch(`${API_URL}/pages`);
        const data = await res.json();
        if (data.success && data.data) {
          setLegalPages(data.data);
        }
      } catch (error) {
        console.error('Error fetching legal pages:', error);
      }
    };
    fetchLegalPages();
  }, []);

  const navigationSections = [
    {
      title: "Events",
      links: [
        "All Events",
        "Concert Series",
        "Cultural Shows",
        "Dance Battles",
        "Food Festival",
        "Art Exhibitions"
      ]
    },
    {
      title: "Participate",
      links: [
        "Miss ADD",
        "Carol Competition",
        "Dance Challenge",
        "Photography Contest",
        "Fashion Show",
        "Talent Hunt"
      ]
    },
    {
      title: "Support",
      links: [
        "Contact Us",
        "FAQ",
        "Ticket Support",
        "Technical Help",
        "Accessibility",
        "Report Issue"
      ]
    },
    {
      title: "Legal",
      links: legalPages.length > 0 
        ? legalPages.map((page: any) => page.title)
        : ["Privacy Policy", "Terms of Service", "Refund Policy", "Code of Conduct", "Cookie Policy", "GDPR"]
    }
  ];

  // Helper to get page slug from title
  const getPageSlug = (title: string) => {
    const page = legalPages.find((p: any) => p.title === title);
    return page ? page.slug : title.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {/* Logo */}
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm text-center leading-tight">
                  ABUJA<br />DETTY<br />DECEMBER
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Abuja Detty December</h3>
              <p className="text-green-400 text-sm mb-4">Nigeria&apos;s Biggest December Festival</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Celebrating Nigerian culture, music, and entertainment with unforgettable experiences in the heart of Abuja.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-sm">info@abujadettydecember.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-sm">+234 802 302 5818</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-sm">Abuja, FCT, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {navigationSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="font-bold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => {
                  const href = section.title === 'Legal' ? `/pages/${getPageSlug(link)}` : '#';
                  return (
                    <li key={linkIndex}>
                      {section.title === 'Legal' ? (
                        <Link
                          href={href}
                          className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                        >
                          {link}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 sm:mb-0">
            © {currentYear} Abuja Detty December. All rights reserved.
          </div>
          
          {/* Scroll to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
