'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch(`${API_URL}/faq`);
        const data = await res.json();
        if (data.success && data.data) {
          setFaqs(data.data);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFAQs();
  }, []);

  const faqData: FAQItem[] = faqs.length > 0 ? faqs : [
    {
      question: "What is Abuja Detty December 2025?",
      answer: "Abuja Detty December 2025 is Nigeria's biggest December celebration featuring music, dance, contests, and unforgettable experiences. It's a month-long festival celebrating Nigerian culture and entertainment in the heart of Abuja."
    },
    {
      question: "How do I purchase tickets for events?",
      answer: "You can purchase tickets through our official website, authorized vendors, or at the venue. We offer various ticket packages including single events, day passes, and full festival access. All tickets are digital and will be sent to your email."
    },
    {
      question: "Can I vote for contestants if I'm outside Nigeria?",
      answer: "Yes! Our voting system is available worldwide. You can vote for your favorite contestants in various competitions through our website or mobile app. International votes are counted equally with local votes."
    },
    {
      question: "Are there bundles or discount packages available?",
      answer: "Yes, we offer several bundle packages including early bird discounts, group discounts, and VIP packages. Students and seniors also receive special pricing. Check our tickets page for current offers."
    },
    {
      question: "How does the affiliate program work?",
      answer: "Our affiliate program allows partners to earn commissions by promoting Abuja Detty December events. You'll receive a unique referral link and earn a percentage of ticket sales generated through your referrals. Contact our partnerships team to learn more."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We&apos;ve got answers!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-6 flex justify-between items-center hover:text-green-600 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
