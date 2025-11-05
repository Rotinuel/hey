'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';
  const isVendorPage = pathname.startsWith('/vendor');

  // Don't render Navigation/Footer for admin, login, or vendor pages
  if (isAdminPage || isLoginPage || isVendorPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}




