import Faq from '@/components/Faq/Faq';
import Hero from '@/components/Hero/Hero';
import LogoStrip from '@/components/LogoStrip/LogoStrip';
import PricingContainer from '@/components/Pricing/PricingContainer/PricingContainer';

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoStrip />
      <PricingContainer />
      <Faq />
    </main>
  );
}
