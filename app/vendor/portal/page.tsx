'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVendorAuth } from '@/contexts/VendorAuthContext';
import AdminContentTable from '@/components/AdminContentTable';
import AdminModal from '@/components/AdminModal';
import { 
  Store, LogOut, Plus, Package, ShoppingBag, User as UserIcon, 
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://addec-backend.onrender.com';

// Helper to get vendor token
const getVendorToken = () => localStorage.getItem('vendor_token');

function VendorPortalContent() {
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const { vendor, logout, isLoading } = useVendorAuth();
  const router = useRouter();
  
  const loading = productsLoading || isLoading;

  useEffect(() => {
    if (!isLoading && !vendor) {
      router.push('/vendor/login');
      return;
    }
    if (vendor) {
      fetchProducts();
    }
  }, [vendor, isLoading, router]);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const token = getVendorToken();
      const res = await fetch(`${API_URL}/products`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await res.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/vendor/login');
  };

  const handleAdd = () => {
    setModalData({
      name: '',
      category: '',
      price: '',
      originalPrice: '',
      image: '',
      description: '',
      rating: 0,
      reviews: 0,
      inStock: true,
      deliveryTime: '2-3 days'
    });
    setIsEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setModalData(item);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = getVendorToken();
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        fetchProducts();
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting product');
    }
  };

  const handleFieldChange = (name: string, value: any) => {
    setModalData({ ...modalData, [name]: value });
  };

  const handleSubmit = async (data: any) => {
    try {
      const token = getVendorToken();
      const baseUrl = isEditMode 
        ? `${API_URL}/products/${data._id}` 
        : `${API_URL}/products`;
      
      // Convert numeric strings to numbers
      if (data.price) data.price = Number(data.price);
      if (data.originalPrice) data.originalPrice = Number(data.originalPrice);
      if (data.rating) data.rating = Number(data.rating);
      if (data.reviews) data.reviews = Number(data.reviews);
      
      // Convert isActive string to boolean
      if (data.inStock === 'true') data.inStock = true;
      if (data.inStock === 'false') data.inStock = false;
      
      const res = await fetch(baseUrl, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        alert(isEditMode ? 'Product updated successfully' : 'Product created successfully');
        setModalOpen(false);
        fetchProducts();
      } else {
        const errorData = await res.json();
        alert(`Failed to ${isEditMode ? 'update' : 'create'} product: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Error ${isEditMode ? 'updating' : 'creating'} product`);
    }
  };

  const productFields = [
    { name: 'name', label: 'Product Name', type: 'text' as const, required: true, placeholder: 'Product name' },
    { name: 'category', label: 'Category', type: 'text' as const, required: true, placeholder: 'Product category' },
    { name: 'price', label: 'Price (₦)', type: 'number' as const, required: true, placeholder: '5000' },
    { name: 'originalPrice', label: 'Original Price (₦)', type: 'number' as const, placeholder: '6000' },
    { name: 'image', label: 'Image', type: 'image' as const, placeholder: '/background/background1.png' },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Product description' },
    { name: 'rating', label: 'Rating', type: 'number' as const, placeholder: '4.5' },
    { name: 'reviews', label: 'Reviews', type: 'number' as const, placeholder: '100' },
    { name: 'deliveryTime', label: 'Delivery Time', type: 'text' as const, placeholder: '2-3 days' },
    { name: 'inStock', label: 'In Stock', type: 'select' as const, required: true, options: [
      { value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }
    ]}
  ];

  const productColumns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'rating', label: 'Rating' },
    { key: 'inStock', label: 'In Stock' }
  ];

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-green-600 hover:text-green-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Site</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                <p className="text-xs text-gray-500">{vendor.category}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Portal</h1>
              <p className="text-gray-600">Manage your products for the marketplace</p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.inStock !== false).length}
                </p>
              </div>
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendor Name</p>
                <p className="text-lg font-semibold text-gray-900">{vendor.name}</p>
              </div>
              <Store className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow">
          <AdminContentTable
            title="Products"
            data={products}
            columns={productColumns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
            isLoading={loading}
          />
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <AdminModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={isEditMode ? 'Edit Product' : 'Add Product'}
          fields={productFields}
          data={modalData}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default function VendorPortalPage() {
  return <VendorPortalContent />;
}
