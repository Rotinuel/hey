'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Vendor {
  id: string;
  name: string;
  username: string;
  email: string;
  category: string;
  role: 'vendor';
}

interface VendorAuthContextType {
  vendor: Vendor | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const VendorAuthContext = createContext<VendorAuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

export function VendorAuthProvider({ children }: { children: ReactNode }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('vendor_token');
      const savedVendor = localStorage.getItem('vendor_user');
      
      if (token && savedVendor) {
        try {
          // Verify token with backend
          const response = await fetch(`${API_URL}/vendor-auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setVendor(data.vendor);
          } else {
            // Token invalid, clear local storage
            localStorage.removeItem('vendor_token');
            localStorage.removeItem('vendor_user');
          }
        } catch (error) {
          console.error('Vendor auth check failed:', error);
          localStorage.removeItem('vendor_token');
          localStorage.removeItem('vendor_user');
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/vendor-auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const vendorData: Vendor = {
          id: data.vendor.id,
          name: data.vendor.name,
          username: data.vendor.username,
          email: data.vendor.email,
          category: data.vendor.category,
          role: 'vendor'
        };
        setVendor(vendorData);
        localStorage.setItem('vendor_token', data.token);
        localStorage.setItem('vendor_user', JSON.stringify(vendorData));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Vendor login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setVendor(null);
    localStorage.removeItem('vendor_token');
    localStorage.removeItem('vendor_user');
  };

  const value = {
    vendor,
    login,
    logout,
    isLoading,
    isAuthenticated: !!vendor
  };

  return (
    <VendorAuthContext.Provider value={value}>
      {children}
    </VendorAuthContext.Provider>
  );
}

export function useVendorAuth() {
  const context = useContext(VendorAuthContext);
  if (context === undefined) {
    throw new Error('useVendorAuth must be used within a VendorAuthProvider');
  }
  return context;
}

