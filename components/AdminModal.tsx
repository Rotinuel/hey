'use client';

import { X } from 'lucide-react';
import MediaPicker from './MediaPicker';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'url' | 'email' | 'date' | 'image' | 'video';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: Field[];
  data: any;
  onChange: (name: string, value: any) => void;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function AdminModal({
  isOpen,
  onClose,
  title,
  fields,
  data,
  onChange,
  onSubmit,
  isLoading = false
}: AdminModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  // Helper to get nested field value
  const getNestedValue = (obj: any, path: string): any => {
    if (!path.includes('.')) return obj[path];
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={getNestedValue(data, field.name) || ''}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={field.rows || 4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={getNestedValue(data, field.name) || ''}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select...</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'image' || field.type === 'video' ? (
                      <div>
                        <MediaPicker
                          onSelect={(url) => onChange(field.name, url)}
                          currentUrl={getNestedValue(data, field.name) || ''}
                          type={field.type}
                          buttonText={`Select ${field.type === 'image' ? 'Image' : 'Video'}`}
                        />
                        {getNestedValue(data, field.name) && (
                          <div className="mt-2">
                            {field.type === 'image' ? (
                              <img
                                src={getNestedValue(data, field.name).startsWith('http') 
                                  ? getNestedValue(data, field.name)
                                  : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://addec-backend.onrender.com'}${getNestedValue(data, field.name)}`}
                                alt="Preview"
                                className="w-full h-32 object-cover rounded-lg border border-gray-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">Video Preview</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        value={getNestedValue(data, field.name) || ''}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
