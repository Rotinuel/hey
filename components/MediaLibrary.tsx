'use client';

import { useState, useEffect, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Video, Search, Filter, Check } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

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

interface MediaLibraryProps {
  onSelect?: (media: MediaItem) => void;
  selectedUrl?: string;
  type?: 'image' | 'video' | 'all';
  multiSelect?: boolean;
  onClose?: () => void;
}

export default function MediaLibrary({ onSelect, selectedUrl, type = 'all', multiSelect = false, onClose }: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>(type as 'all' | 'image' | 'video');
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedUrl ? [selectedUrl] : []);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, [filterType, search, page]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('add_token');
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '24',
        ...(filterType !== 'all' && { type: filterType }),
        ...(search && { search })
      });
      
      const res = await fetch(`${API_URL}/media?${queryParams}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await res.json();
      
      if (data.success) {
        setMedia(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const token = localStorage.getItem('add_token');
      const formData = new FormData();
      formData.append('file', files[0]);

      const res = await fetch(`${API_URL}/media/upload`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        await fetchMedia();
        if (onSelect) {
          onSelect(data.data);
        }
      } else {
        alert(data.message || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSelect = (item: MediaItem) => {
    if (multiSelect) {
      const isSelected = selectedItems.includes(item.url);
      if (isSelected) {
        setSelectedItems(selectedItems.filter(url => url !== item.url));
      } else {
        setSelectedItems([...selectedItems, item.url]);
      }
    } else {
      if (onSelect) {
        onSelect(item);
      }
      if (onClose) {
        onClose();
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFullUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    const backendUrl = API_URL.replace('/api', '');
    return `${backendUrl}${url}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
        <div className="flex items-center space-x-3">
          <input
            ref={fileInputRef}
            type="file"
            accept={filterType === 'image' ? 'image/*' : filterType === 'video' ? 'video/*' : 'image/*,video/*'}
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <Upload className="w-5 h-5" />
            <span>{uploading ? 'Uploading...' : 'Upload'}</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b bg-gray-50 flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="outline-none text-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => {
              setFilterType('all');
              setPage(1);
            }}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              filterType === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilterType('image');
              setPage(1);
            }}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              filterType === 'image' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ImageIcon className="w-4 h-4 inline mr-1" />
            Images
          </button>
          <button
            onClick={() => {
              setFilterType('video');
              setPage(1);
            }}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              filterType === 'video' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Video className="w-4 h-4 inline mr-1" />
            Videos
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No media found. Upload your first file!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {media.map((item) => {
              const isSelected = selectedItems.includes(item.url) || (!multiSelect && selectedUrl === item.url);
              return (
                <div
                  key={item._id}
                  onClick={() => handleSelect(item)}
                  className={`relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all ${
                    isSelected ? 'border-green-600 ring-2 ring-green-200' : 'border-gray-200 hover:border-green-400'
                  }`}
                >
                  {item.type === 'image' ? (
                    <img
                      src={getFullUrl(item.url)}
                      alt={item.alt || item.originalName}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.png';
                      }}
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-900 flex items-center justify-center relative">
                      <Video className="w-8 h-8 text-white" />
                      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                        {formatFileSize(item.size)}
                      </div>
                    </div>
                  )}
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-green-600 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-white text-center px-2">
                      <p className="text-xs font-medium truncate w-full">{item.originalName}</p>
                      <p className="text-xs text-gray-300">{formatFileSize(item.size)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t flex items-center justify-between">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}


