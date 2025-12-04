'use client';

import { useState } from 'react';
import { Users, Mail, Phone, MapPin, Briefcase, Send, CheckCircle } from 'lucide-react';
// Layout components are injected globally

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  areaOfInterest: string[];
  experience: string;
  availability: string;
  additionalInfo: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  areaOfInterest?: string;
  availability?: string;
}

export default function VolunteerPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    areaOfInterest: [],
    experience: '',
    availability: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const volunteerAreas = [
    'Event Setup & Logistics',
    'Registration & Check-in',
    'Stage Management',
    'Security & Safety',
    'Media & Photography',
    'Hospitality & Guest Services',
    'Vendor Management',
    'Volunteer Coordination',
    'Transportation & Parking',
    'Technical Support',
    'Marketing & Promotion',
    'Other'
  ];

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAreaToggle = (area: string) => {
    const newAreas = formData.areaOfInterest.includes(area)
      ? formData.areaOfInterest.filter(a => a !== area)
      : [...formData.areaOfInterest, area];
    
    handleInputChange('areaOfInterest', newAreas);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (formData.areaOfInterest.length === 0) {
      newErrors.areaOfInterest = 'Please select at least one area of interest';
    }

    if (!formData.availability.trim()) {
      newErrors.availability = 'Please specify your availability';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Volunteer form submitted:', formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          areaOfInterest: [],
          experience: '',
          availability: '',
          additionalInfo: ''
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and content */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 pt-32 md:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Become a Volunteer
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Join our amazing team and help make Abuja Detty December 2025 an unforgettable experience!
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <p className="text-green-800 font-medium">
                Thank you for volunteering! We&apos;ll contact you soon.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-600" />
                Personal Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-2 text-green-600" />
                Contact Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+234 801 234 5678"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Volunteer Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-green-600" />
                Volunteer Details
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Areas of Interest * (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {volunteerAreas.map((area) => (
                    <label key={area} className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-green-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.areaOfInterest.includes(area)}
                        onChange={() => handleAreaToggle(area)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
                {errors.areaOfInterest && (
                  <p className="text-red-500 text-sm mt-2">{errors.areaOfInterest}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Volunteer Experience
                </label>
                <textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                  placeholder="Tell us about your previous volunteer experience..."
                />
              </div>

              <div className="mb-6">
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                  Availability * (e.g., Full days, Morning only, Evening only)
                </label>
                <input
                  type="text"
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.availability ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Specify your availability"
                />
                {errors.availability && (
                  <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
                )}
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                  placeholder="Any additional information you&apos;d like to share..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}




