import Box from '@mui/material/Box';

import HeroSection from './sections/hero-section';
import LandingHeader from './sections/landing-header';
import LandingFooter from './sections/landing-footer';
import EconomySection from './sections/economy-section';
import PricingSection from './sections/pricing-section';
import FeaturesSection from './sections/features-section';
import FinalCtaSection from './sections/final-cta-section';
import AdvantagesSection from './sections/advantages-section';
import TargetAudienceSection from './sections/target-audience-section';
import CompetitorComparisonSection from './sections/competitor-comparison-section';

export default function LandingView() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingHeader />

      <Box component="main" sx={{ flex: 1 }}>
        <HeroSection />
        <EconomySection />
        <AdvantagesSection />
        <FeaturesSection />
        <TargetAudienceSection />
        <CompetitorComparisonSection />
        <PricingSection />
        <FinalCtaSection />
      </Box>

      <LandingFooter />
    </Box>
  );
}
