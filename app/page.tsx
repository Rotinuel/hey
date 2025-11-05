import HeroSection from '@/components/HeroSection';
import ContestShowcase from '@/components/ContestShowcase';
import SponsorsSection from '@/components/SponsorsSection';
import EventsPreview from '@/components/EventsPreview';
import WhyChooseSection from '@/components/WhyChooseSection';
import LatestNewsSection from '@/components/LatestNewsSection';
import CTASection from '@/components/CTASection';
import NewsletterSection from '@/components/NewsletterSection';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ContestShowcase />
      <SponsorsSection />
      <EventsPreview />
      <WhyChooseSection />
      <LatestNewsSection />
      <CTASection />
      <NewsletterSection />
      <FAQSection />
    </>
  );
}
