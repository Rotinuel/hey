'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Search, User, Bell, ShoppingCart, Menu, X, LogOut } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '';
    }
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-green-600 font-bold text-lg">
              ABUJA DETTY DECEMBER
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link 
              href="/" 
              className={`transition-colors ${
                isActive('/') ? 'text-green-400' : 'text-white hover:text-green-400'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/events" 
              className={`transition-colors ${
                isActive('/events') ? 'text-green-400' : 'text-white hover:text-green-400'
              }`}
            >
              Events
            </Link>
            <Link 
              href="/reservation" 
              className={`transition-colors ${
                isActive('/reservation') ? 'text-green-400' : 'text-white hover:text-green-400'
              }`}
            >
              Reservation
            </Link>
            <Link 
              href="/volunteer" 
              className={`transition-colors ${
                isActive('/volunteer') ? 'text-green-400' : 'text-white hover:text-green-400'
              }`}
            >
              Volunteer
            </Link>
            <Link 
              href="/gallery" 
              className={`transition-colors ${
                isActive('/gallery') ? 'text-green-400' : 'text-white hover:text-green-400'
              }`}
            >
              Gallery
            </Link>
            <Link 
              href="/marketplace" 
              className={`transition-colors ${
                isActive('/marketplace') ? 'text-green-400' : 'text-white hover:text-green-400'
              }`}
            >
              Marketplace
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors ${
                isActive('/contact') ? 'text-green-400' : 'text-white hover:text-green-400'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:flex items-center bg-white/10 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-white/70 mr-2" />
              <input
                type="text"
                placeholder="search..."
                className="bg-transparent text-white placeholder-white/70 text-sm outline-none"
              />
            </div>

            {/* Icons */}
            <div className="hidden sm:flex items-center space-x-3">
              <button className="p-2 text-white hover:text-green-400 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-white hover:text-green-400 transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>

            {/* User Menu or Sign In Button */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden sm:flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user?.name}</span>
                </button>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    {user?.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/diaspora"
                className="hidden sm:block bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Diaspora Ticket
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:text-green-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-sm rounded-lg mb-4 p-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`transition-colors ${
                  isActive('/') ? 'text-green-400' : 'text-white hover:text-green-400'
                }`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                href="/events" 
                className={`transition-colors ${
                  isActive('/events') ? 'text-green-400' : 'text-white hover:text-green-400'
                }`}
                onClick={toggleMenu}
              >
                Events
              </Link>
              <Link 
                href="/reservation" 
                className={`transition-colors ${
                  isActive('/reservation') ? 'text-green-400' : 'text-white hover:text-green-400'
                }`}
                onClick={toggleMenu}
              >
                Reservation
              </Link>
              <Link 
                href="/volunteer" 
                className={`transition-colors ${
                  isActive('/volunteer') ? 'text-green-400' : 'text-white hover:text-green-400'
                }`}
                onClick={toggleMenu}
              >
                Volunteer
              </Link>
              <Link 
                href="/gallery" 
                className={`transition-colors ${
                  isActive('/gallery') ? 'text-green-400' : 'text-white hover:text-green-400'
                }`}
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link 
                href="/marketplace" 
                className={`transition-colors ${
                  isActive('/marketplace') ? 'text-green-400' : 'text-white hover:text-green-400'
                }`}
                onClick={toggleMenu}
              >
                Marketplace
              </Link>
              <Link 
                href="/contact" 
                className={`transition-colors ${
                  isActive('/contact') ? 'text-green-400' : 'text-white hover:text-green-400'
                }`}
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-white/20">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 bg-white/10 rounded-lg">
                      <p className="text-sm text-white font-medium">{user?.name}</p>
                      <p className="text-xs text-white/70">{user?.email}</p>
                    </div>
                    {user?.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-center"
                        onClick={toggleMenu}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/diaspora"
                    className="block w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center"
                    onClick={toggleMenu}
                  >
                    Diaspora Ticket
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

