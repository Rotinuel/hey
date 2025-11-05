import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'
import { AuthProvider } from '@/contexts/AuthContext'
import { VendorAuthProvider } from '@/contexts/VendorAuthContext'

export const metadata: Metadata = {
  title: 'Abuja Detty December 2025',
  description: 'Nigeria\'s biggest December celebration — music, dance, contests, and unforgettable memories.',
  keywords: 'Abuja, Nigeria, December, festival, music, dance, contests, talent show',
  authors: [{ name: 'Abuja Detty December Team' }],
  openGraph: {
    title: 'Abuja Detty December 2025',
    description: 'Nigeria\'s biggest December celebration — music, dance, contests, and unforgettable memories.',
    type: 'website',
    locale: 'en_NG',
    url: 'https://abujadettydecember.com',
    siteName: 'Abuja Detty December',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Abuja Detty December 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abuja Detty December 2025',
    description: 'Nigeria\'s biggest December celebration — music, dance, contests, and unforgettable memories.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <VendorAuthProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </VendorAuthProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


