import Faq from '@/components/Faq/Faq';
import Hero from '@/components/Hero/Hero';
import LogoStrip from '@/components/LogoStrip/LogoStrip';
import PricingContainer from '@/components/Pricing/PricingContainer/PricingContainer';
import CallToAction from '@/components/CallToAction/CallToAction';
import Stats from '@/components/Stats/Stats';

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoStrip />
      <PricingContainer />
      <Faq />
      <CallToAction/>
      <Stats/>
    </main>
  );
}
