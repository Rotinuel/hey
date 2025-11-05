'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminContentTable from '@/components/AdminContentTable';
import AdminModal from '@/components/AdminModal';
import MediaLibrary from '@/components/MediaLibrary';
import { 
  Home, Calendar, Users, Award, DollarSign, Newspaper, Image, 
  MessageSquare, HelpCircle, Settings, LogOut, Menu, X,
  Calendar as CalendarIcon, Building, ShoppingBag, Heart, ArrowLeft,
  Plus, FileText, FolderOpen
} from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

interface DashboardStats {
  events: number;
  contests: number;
  volunteers: number;
  products: number;
  news: number;
  sponsors: number;
  gallery: number;
  faq: number;
  vendors: number;
  testimonials: number;
  pages: number;
}

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    events: 0, contests: 0, volunteers: 0, products: 0, news: 0,
    sponsors: 0, gallery: 0, faq: 0, vendors: 0, testimonials: 0, pages: 0
  });
  const [contentData, setContentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchStats();
    if (activeTab !== 'dashboard') fetchContentData(activeTab);
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const [e, c, v, p, n, s, g, f, vd, t, pg] = await Promise.all([
        fetch(`${API_URL}/events`), fetch(`${API_URL}/contests`), fetch(`${API_URL}/volunteers`), fetch(`${API_URL}/products`),
        fetch(`${API_URL}/news`), fetch(`${API_URL}/sponsors`), fetch(`${API_URL}/gallery`), fetch(`${API_URL}/faq`),
        fetch(`${API_URL}/vendors`), fetch(`${API_URL}/testimonials`), fetch(`${API_URL}/pages`)
      ]);
      const [eD, cD, vD, pD, nD, sD, gD, fD, vdD, tD, pgD] = await Promise.all([
        e.json(), c.json(), v.json(), p.json(), n.json(), s.json(), g.json(), f.json(), vd.json(), t.json(), pg.json()
      ]);
      setStats({
        events: eD.data?.length || 0, contests: cD.data?.length || 0, volunteers: vD.data?.length || 0,
        products: pD.data?.length || 0, news: nD.data?.length || 0, sponsors: sD.data?.length || 0,
        gallery: gD.data?.length || 0, faq: fD.data?.length || 0, vendors: vdD.data?.length || 0,
        testimonials: tD.data?.length || 0, pages: pgD.data?.length || 0
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const fetchContentData = async (tab: string) => {
    setLoading(true);
    try {
      const endpoint = ['events', 'contests', 'news', 'products', 'sponsors', 'gallery', 'faq', 'volunteers', 'vendors', 'testimonials', 'pages'].includes(tab) ? tab : '';
      if (!endpoint || tab === 'media') return;
      const token = localStorage.getItem('add_token');
      const res = await fetch(`${API_URL}/${endpoint}`, { headers: token ? { 'Authorization': `Bearer ${token}` } : {} });
      const data = await res.json();
      setContentData(data.data || []);
    } catch (error) {
      console.error(`Error fetching ${tab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { logout(); router.push('/login'); };

  const getToken = () => localStorage.getItem('add_token');
  const handleFieldChange = (name: string, value: any) => {
    if (name.includes('.')) {
      // Handle nested fields like socialMedia.facebook
      const parts = name.split('.');
      const updated = { ...modalData };
      let current: any = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      setModalData(updated);
    } else {
      setModalData({ ...modalData, [name]: value });
    }
  };

  const handleAdd = () => { setIsEditMode(false); setModalData({}); setModalOpen(true); };

  const handleEdit = (item: any) => { setIsEditMode(true); setModalData(item); setModalOpen(true); };

  const handleDelete = async (id: string) => {
    try {
      const endpoint = activeTab;
      const token = getToken();
      const url = activeTab === 'pages' ? `${API_URL}/${endpoint}/id/${id}` : `${API_URL}/${endpoint}/${id}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        alert('Item deleted successfully');
        fetchContentData(activeTab);
        fetchStats();
      } else alert('Failed to delete item');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting item');
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const endpoint = activeTab;
      const token = getToken();
      const baseUrl = activeTab === 'pages' && isEditMode 
        ? `${API_URL}/${endpoint}/id/${data._id}`
        : isEditMode 
          ? `${API_URL}/${endpoint}/${data._id}` 
          : `${API_URL}/${endpoint}`;
      const res = await fetch(baseUrl, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert(isEditMode ? 'Item updated successfully' : 'Item created successfully');
        setModalOpen(false);
        fetchContentData(activeTab);
        fetchStats();
      } else alert(`Failed to ${isEditMode ? 'update' : 'create'} item`);
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Error ${isEditMode ? 'updating' : 'creating'} item`);
    }
  };

  const getFields = () => {
    switch(activeTab) {
      case 'events': return [
        { name: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'Event title' },
        { name: 'category', label: 'Category', type: 'select' as const, required: true, options: [
          { value: 'Concert', label: 'Concert' }, { value: 'Comedy', label: 'Comedy' }, { value: 'Cultural', label: 'Cultural' },
          { value: 'Contest', label: 'Contest' }, { value: 'Food', label: 'Food' }, { value: 'Workshop', label: 'Workshop' },
          { value: 'Festival', label: 'Festival' }
        ]},
        { name: 'date', label: 'Date', type: 'text' as const, required: true, placeholder: 'December 15, 2025' },
        { name: 'location', label: 'Location', type: 'text' as const, required: true, placeholder: 'Event location' },
        { name: 'capacity', label: 'Capacity', type: 'number' as const, required: true, placeholder: '5000' },
        { name: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Event description' },
        { name: 'image', label: 'Image', type: 'image' as const, placeholder: '/background/background1.png' },
        { name: 'price', label: 'Price', type: 'text' as const, required: true, placeholder: '₦15,000' }
      ];
      case 'contests': return [
        { name: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'Contest title' },
        { name: 'category', label: 'Category', type: 'text' as const, required: true, placeholder: 'Contest category' },
        { name: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Contest description' },
        { name: 'prize', label: 'Prize', type: 'text' as const, placeholder: 'Contest prize' },
        { name: 'status', label: 'Status', type: 'select' as const, required: true, options: [
          { value: 'upcoming', label: 'Upcoming' }, { value: 'active', label: 'Active' }, { value: 'completed', label: 'Completed' }
        ]}
      ];
      case 'news': return [
        { name: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'News title' },
        { name: 'category', label: 'Category', type: 'text' as const, required: true, placeholder: 'News category' },
        { name: 'content', label: 'Content', type: 'textarea' as const, required: true, rows: 6, placeholder: 'News content' },
        { name: 'image', label: 'Image', type: 'image' as const, placeholder: '/news/example.png' },
        { name: 'author', label: 'Author', type: 'text' as const, placeholder: 'Author name' },
        { name: 'date', label: 'Date', type: 'text' as const, required: true, placeholder: 'December 15, 2025' }
      ];
      case 'products': return [
        { name: 'vendorName', label: 'Vendor Name', type: 'text' as const, required: true, placeholder: 'Vendor name' },
        { name: 'name', label: 'Product Name', type: 'text' as const, required: true, placeholder: 'Product name' },
        { name: 'category', label: 'Category', type: 'text' as const, required: true, placeholder: 'Product category' },
        { name: 'price', label: 'Price', type: 'number' as const, required: true, placeholder: '5000' },
        { name: 'originalPrice', label: 'Original Price', type: 'number' as const, placeholder: '6000' },
        { name: 'image', label: 'Image', type: 'image' as const, placeholder: '/background/background1.png' },
        { name: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Product description' },
        { name: 'rating', label: 'Rating', type: 'number' as const, placeholder: '4.5' },
        { name: 'reviews', label: 'Reviews', type: 'number' as const, placeholder: '100' },
        { name: 'deliveryTime', label: 'Delivery Time', type: 'text' as const, placeholder: '2-3 days' }
      ];
      case 'sponsors': return [
        { name: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Sponsor name' },
        { name: 'logo', label: 'Logo', type: 'image' as const, placeholder: '/sponsors/logo.png' },
        { name: 'website', label: 'Website', type: 'url' as const, placeholder: 'https://sponsor.com' },
        { name: 'socialMedia.facebook', label: 'Facebook URL', type: 'text' as const, placeholder: 'https://facebook.com/sponsor' },
        { name: 'socialMedia.instagram', label: 'Instagram URL', type: 'text' as const, placeholder: 'https://instagram.com/sponsor' },
        { name: 'socialMedia.twitter', label: 'Twitter URL', type: 'text' as const, placeholder: 'https://twitter.com/sponsor' },
        { name: 'socialMedia.linkedin', label: 'LinkedIn URL', type: 'text' as const, placeholder: 'https://linkedin.com/company/sponsor' },
        { name: 'socialMedia.youtube', label: 'YouTube URL', type: 'text' as const, placeholder: 'https://youtube.com/@sponsor' },
        { name: 'socialMedia.tiktok', label: 'TikTok URL', type: 'text' as const, placeholder: 'https://tiktok.com/@sponsor' },
        { name: 'description', label: 'Description', type: 'textarea' as const, placeholder: 'Sponsor description' },
        { name: 'tier', label: 'Tier', type: 'select' as const, required: true, options: [
          { value: 'gold', label: 'Gold' }, { value: 'silver', label: 'Silver' }, { value: 'bronze', label: 'Bronze' }
        ]}
      ];
      case 'gallery': return [
        { name: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'Gallery item title' },
        { name: 'image', label: 'Image/Video', type: 'image' as const, required: true, placeholder: '/gallery/item.jpg' },
        { name: 'type', label: 'Type', type: 'select' as const, required: true, options: [
          { value: 'video', label: 'Video' }, { value: 'photo', label: 'Photo' }, { value: 'performance', label: 'Performance' },
          { value: 'behind-scenes', label: 'Behind Scenes' }
        ]},
        { name: 'date', label: 'Date', type: 'text' as const, required: true, placeholder: 'December 15, 2025' },
        { name: 'views', label: 'Views', type: 'number' as const, placeholder: '1000' }
      ];
      case 'faq': return [
        { name: 'question', label: 'Question', type: 'text' as const, required: true, placeholder: 'Frequently asked question' },
        { name: 'answer', label: 'Answer', type: 'textarea' as const, required: true, rows: 6, placeholder: 'Answer to the question' }
      ];
      case 'volunteers': return [
        { name: 'firstName', label: 'First Name', type: 'text' as const, required: true, placeholder: 'First name' },
        { name: 'lastName', label: 'Last Name', type: 'text' as const, required: true, placeholder: 'Last name' },
        { name: 'email', label: 'Email', type: 'email' as const, required: true, placeholder: 'email@example.com' },
        { name: 'phone', label: 'Phone', type: 'text' as const, required: true, placeholder: '+234 801 234 5678' },
        { name: 'address', label: 'Address', type: 'text' as const, required: true, placeholder: 'Full address' },
        { name: 'experience', label: 'Experience', type: 'textarea' as const, placeholder: 'Previous experience' },
        { name: 'availability', label: 'Availability', type: 'text' as const, required: true, placeholder: 'Full days, Morning only, etc.' },
        { name: 'additionalInfo', label: 'Additional Info', type: 'textarea' as const, placeholder: 'Any additional information' },
        { name: 'status', label: 'Status', type: 'select' as const, required: true, options: [
          { value: 'pending', label: 'Pending' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Rejected' }
        ]}
      ];
      case 'vendors': return [
        { name: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Vendor name' },
        { name: 'username', label: 'Username', type: 'text' as const, required: true, placeholder: 'vendor_username' },
        { name: 'email', label: 'Email', type: 'email' as const, required: true, placeholder: 'vendor@example.com' },
        { name: 'password', label: 'Password', type: 'text' as const, required: true, placeholder: 'Password (min 6 characters)' },
        { name: 'category', label: 'Category', type: 'text' as const, required: true, placeholder: 'Vendor category' },
        { name: 'rating', label: 'Rating', type: 'number' as const, placeholder: '4.5' },
        { name: 'totalProducts', label: 'Total Products', type: 'number' as const, placeholder: '50' },
        { name: 'description', label: 'Description', type: 'textarea' as const, placeholder: 'Vendor description' },
        { name: 'isActive', label: 'Active', type: 'select' as const, required: true, options: [
          { value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }
        ]}
      ];
      case 'testimonials': return [
        { name: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Person name' },
        { name: 'role', label: 'Role', type: 'text' as const, required: true, placeholder: 'Person role' },
        { name: 'quote', label: 'Quote', type: 'textarea' as const, required: true, rows: 6, placeholder: 'Testimonial quote' },
        { name: 'image', label: 'Image', type: 'image' as const, placeholder: '/test/example.jpg' }
      ];
      case 'pages': return [
        { name: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'Page title' },
        { name: 'slug', label: 'Slug', type: 'text' as const, required: true, placeholder: 'page-slug' },
        { name: 'content', label: 'Content', type: 'textarea' as const, required: true, rows: 10, placeholder: 'Page content' }
      ];
      default: return [];
    }
  };

  const getColumns = () => {
    const cols: any[] = [];
    switch(activeTab) {
      case 'events': return [
        { key: 'title', label: 'Title' }, { key: 'category', label: 'Category' },
        { key: 'date', label: 'Date' }, { key: 'location', label: 'Location' },
        { key: 'capacity', label: 'Capacity' }, { key: 'price', label: 'Price' }
      ];
      case 'contests': return [
        { key: 'title', label: 'Title' }, { key: 'category', label: 'Category' },
        { key: 'status', label: 'Status' }, { key: 'prize', label: 'Prize' }
      ];
      case 'news': return [
        { key: 'title', label: 'Title' }, { key: 'category', label: 'Category' },
        { key: 'author', label: 'Author' }, { key: 'date', label: 'Date' }
      ];
      case 'products': return [
        { key: 'name', label: 'Name' }, { key: 'vendorName', label: 'Vendor' },
        { key: 'category', label: 'Category' }, { key: 'price', label: 'Price' },
        { key: 'rating', label: 'Rating' }
      ];
      case 'sponsors': return [
        { key: 'name', label: 'Name' }, { key: 'tier', label: 'Tier' },
        { key: 'website', label: 'Website' }
      ];
      case 'gallery': return [
        { key: 'title', label: 'Title' }, { key: 'type', label: 'Type' },
        { key: 'date', label: 'Date' }, { key: 'views', label: 'Views' }
      ];
      case 'faq': return [
        { key: 'question', label: 'Question' }, { key: 'answer', label: 'Answer' }
      ];
      case 'volunteers': return [
        { key: 'firstName', label: 'First Name' }, { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' },
        { key: 'status', label: 'Status' }
      ];
      case 'vendors': return [
        { key: 'name', label: 'Name' }, { key: 'category', label: 'Category' },
        { key: 'rating', label: 'Rating' }, { key: 'totalProducts', label: 'Total Products' }
      ];
      case 'testimonials': return [
        { key: 'name', label: 'Name' }, { key: 'role', label: 'Role' },
        { key: 'quote', label: 'Quote', render: (row: any) => <div className="max-w-md truncate">{row.quote}</div> }
      ];
      case 'pages': return [
        { key: 'title', label: 'Title' }, { key: 'slug', label: 'Slug' }
      ];
      default: return [];
    }
  };

  const renderDashboard = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Abuja Detty December Admin Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Events', value: stats.events, color: 'bg-blue-500', icon: CalendarIcon },
          { title: 'Contests', value: stats.contests, color: 'bg-purple-500', icon: Award },
          { title: 'News', value: stats.news, color: 'bg-yellow-500', icon: Newspaper },
          { title: 'Products', value: stats.products, color: 'bg-orange-500', icon: ShoppingBag },
          { title: 'Sponsors', value: stats.sponsors, color: 'bg-indigo-500', icon: Building },
          { title: 'Gallery', value: stats.gallery, color: 'bg-pink-500', icon: Image },
          { title: 'FAQ', value: stats.faq, color: 'bg-red-500', icon: HelpCircle },
          { title: 'Volunteers', value: stats.volunteers, color: 'bg-green-500', icon: Users },
          { title: 'Vendors', value: stats.vendors, color: 'bg-cyan-500', icon: ShoppingBag },
          { title: 'Testimonials', value: stats.testimonials, color: 'bg-teal-500', icon: MessageSquare },
          { title: 'pages', value: stats.pages, color: 'bg-gray-500', icon: FileText }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab(stat.title.toLowerCase())}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button onClick={() => setActiveTab('events')} className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-left flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Manage Events
            </button>
            <button onClick={() => setActiveTab('volunteers')} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-left flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Manage Volunteers
            </button>
            <button onClick={() => setActiveTab('products')} className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-left flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Manage Products
            </button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Managing {stats.volunteers} volunteer applications</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{stats.events} events scheduled</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>{stats.products} products available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'media', name: 'Media Library', icon: FolderOpen },
    { id: 'events', name: 'Events', icon: CalendarIcon },
    { id: 'contests', name: 'Contests', icon: Award },
    { id: 'news', name: 'News', icon: Newspaper },
    { id: 'products', name: 'Products', icon: ShoppingBag },
    { id: 'sponsors', name: 'Sponsors', icon: Building },
    { id: 'gallery', name: 'Gallery', icon: Image },
    { id: 'faq', name: 'FAQ', icon: HelpCircle },
    { id: 'volunteers', name: 'Volunteers', icon: Users },
    { id: 'vendors', name: 'Vendors', icon: ShoppingBag },
    { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
    { id: 'pages', name: 'Pages', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900">
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Site</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-gray-900">{user?.email}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>
              <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`} style={{ top: '73px', height: 'calc(100vh - 73px)' }}>
        <div className="flex flex-col h-full">
          <nav className="flex-1 overflow-y-auto pt-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 transition-colors ${
                    activeTab === item.id ? 'bg-gray-800 text-green-400 border-l-4 border-green-400' : 'text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <div className="text-center text-gray-400 text-sm">
              <p>Admin Portal</p>
              <p className="text-xs mt-1">Abuja Detty December</p>
            </div>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="lg:ml-64 mt-16">
        <div className="p-6">
          {loading && activeTab === 'dashboard' ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : activeTab === 'dashboard' ? (
            renderDashboard()
          ) : activeTab === 'media' ? (
            <MediaLibrary />
          ) : (
            <AdminContentTable
              title={navigationItems.find(n => n.id === activeTab)?.name || 'Content'}
              columns={getColumns()}
              data={contentData}
              isLoading={loading}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${isEditMode ? 'Edit' : 'Add New'} ${navigationItems.find(n => n.id === activeTab)?.name || 'Item'}`}
        fields={getFields()}
        data={modalData}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}