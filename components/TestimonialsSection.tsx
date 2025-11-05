'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
  image: string;
}

interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
}

function TestimonialCard({ name, role, quote, image }: TestimonialProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-6">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Name and Role */}
        <h4 className="text-xl font-bold text-gray-900 mb-2">{name}</h4>
        <p className="text-gray-600 mb-6">{role}</p>
        
        {/* Quote */}
        <blockquote className="text-gray-700 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_URL}/testimonials`);
        const data = await res.json();
        if (data.success && data.data) {
          setTestimonials(data.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  const testimonialsList = testimonials.length > 0 ? testimonials.map(t => ({
    name: t.name,
    role: t.role,
    quote: t.quote,
    image: t.image || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  })) : [
    {
      name: "Chioma Adeleke",
      role: "ADD Partner",
      quote: "We partnered with their smaller activations before, and the professionalism and organization exceeded our expectations. The team's attention to detail is remarkable.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Emeka Nwosu",
      role: "Vendor Partner",
      quote: "The team behind this has never disappointed vendors. Every event is well-organized, and the support they provide to vendors is exceptional.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Sarah Johnson",
      role: "Miss Add Contestant",
      quote: "I sold at their last trade exhibition — it was well-organized and the exposure was incredible. The Miss ADD competition has been life-changing for me.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            What People Say
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hear from our amazing community of attendees, contestants, and partners.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsList.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
