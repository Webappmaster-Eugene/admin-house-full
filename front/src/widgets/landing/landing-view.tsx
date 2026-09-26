import Box from '@mui/material/Box';

import FaqSection from './sections/faq-section';
import HeroSection from './sections/hero-section';
import LandingIconSprite from './landing-icon-sprite';
import LandingHeader from './sections/landing-header';
import LandingFooter from './sections/landing-footer';
import PricingSection from './sections/pricing-section';
import AudienceSection from './sections/audience-section';
import ProblemsSection from './sections/problems-section';
import FinalCtaSection from './sections/final-cta-section';
import HowItWorksSection from './sections/how-it-works-section';

export default function LandingView() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingIconSprite />

      <LandingHeader />

      <Box component="main" sx={{ flex: 1 }}>
        <HeroSection />
        <ProblemsSection />
        <HowItWorksSection />
        <AudienceSection />
        <FaqSection />
        <PricingSection />
        <FinalCtaSection />
      </Box>

      <LandingFooter />
    </Box>
  );
}
