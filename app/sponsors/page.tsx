'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
// Layout provided by ConditionalLayout

interface FormData {
  // Step 1
  company: string;
  companyWebsite: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyDescription: string;
  
  // Step 2
  howDidYouHear: string;
  
  // Step 3
  objectives: string[];
  involvementAndSuccess: string;
}

interface FormErrors {
  company?: string;
  companyWebsite?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyDescription?: string;
  howDidYouHear?: string;
  objectives?: string;
  involvementAndSuccess?: string;
}

export default function SponsorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    company: '',
    companyWebsite: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyDescription: '',
    howDidYouHear: '',
    objectives: [],
    involvementAndSuccess: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const objectivesOptions = [
    'Lead Generation',
    'Brand Awareness',
    'Thought Leadership',
    'Community Engagement',
    'Talent/Recruitment',
    'Media Exposure',
    'Product Sampling',
    'Others'
  ];

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.companyDescription.trim()) newErrors.companyDescription = 'Company description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.howDidYouHear.trim()) {
      newErrors.howDidYouHear = 'Please tell us how you heard about Abuja Detty December 2025';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: FormErrors = {};
    
    if (formData.objectives.length === 0) {
      newErrors.objectives = 'Please select at least one objective';
    }
    if (!formData.involvementAndSuccess.trim()) {
      newErrors.involvementAndSuccess = 'Please describe your involvement and success vision';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
    }

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (isValid && currentStep === 3) {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you for your interest in sponsoring Abuja Detty December 2025! We will contact you soon.');
    // Here you would typically send the data to your backend
  };

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleObjectiveToggle = (objective: string) => {
    const newObjectives = formData.objectives.includes(objective)
      ? formData.objectives.filter(obj => obj !== objective)
      : [...formData.objectives, objective];
    
    handleInputChange('objectives', newObjectives);
  };

  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-1 mx-2 ${
                  step < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter company name"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Website (optional)
            </label>
            <input
              type="url"
              value={formData.companyWebsite}
              onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="https://www.company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+234..."
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Description *
        </label>
        <textarea
          value={formData.companyDescription}
          onChange={(e) => handleInputChange('companyDescription', e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-y ${
            errors.companyDescription ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tell us about your company..."
        />
        {errors.companyDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.companyDescription}</p>
        )}
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How did you hear about Abuja Detty December 2025? *
        </label>
        <textarea
          value={formData.howDidYouHear}
          onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-y ${
            errors.howDidYouHear ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Social media, friend, etc."
        />
        {errors.howDidYouHear && (
          <p className="text-red-500 text-sm mt-1">{errors.howDidYouHear}</p>
        )}
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Please share more about your objectives or any ideas for activating your brand at Abuja Detty December 2025 *
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          {objectivesOptions.map((objective) => (
            <label key={objective} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.objectives.includes(objective)}
                onChange={() => handleObjectiveToggle(objective)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-gray-700">{objective}</span>
            </label>
          ))}
        </div>
        {errors.objectives && (
          <p className="text-red-500 text-sm mt-2">{errors.objectives}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Let us know how you envision your involvement and what success looks like for your brand. *
        </label>
        <textarea
          value={formData.involvementAndSuccess}
          onChange={(e) => handleInputChange('involvementAndSuccess', e.target.value)}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-y ${
            errors.involvementAndSuccess ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe your vision for brand activation and success metrics..."
        />
        {errors.involvementAndSuccess && (
          <p className="text-red-500 text-sm mt-1">{errors.involvementAndSuccess}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm pt-32 md:pt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Become a Sponsor
          </h1>
          
          <StepIndicator />
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-t-4 border-r border-b border-green-600">
          <div className="p-8">
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
              
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
              >
                <span>{currentStep === 3 ? 'Submit' : 'Next'}</span>
                {currentStep < 3 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
