'use client';

import { useState } from 'react';
import MediaLibrary from './MediaLibrary';
import { X } from 'lucide-react';

interface MediaItem {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video';
  mimeType: string;
  size: number;
  alt?: string;
  caption?: string;
  createdAt: string;
}

interface MediaPickerProps {
  onSelect: (url: string) => void;
  currentUrl?: string;
  type?: 'image' | 'video' | 'all';
  buttonText?: string;
}

export default function MediaPicker({ onSelect, currentUrl, type = 'all', buttonText = 'Select Media' }: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (media: MediaItem) => {
    onSelect(media.url);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
        >
          {buttonText}
        </button>
        {currentUrl && (
          <div className="flex-1 text-sm text-gray-600 truncate">
            {currentUrl}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative">
            <MediaLibrary
              onSelect={handleSelect}
              selectedUrl={currentUrl}
              type={type}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}



