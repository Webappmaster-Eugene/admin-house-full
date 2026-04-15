import Box from '@mui/material/Box';

import HeroSection from './sections/hero-section';
import LandingHeader from './sections/landing-header';
import LandingFooter from './sections/landing-footer';
import FeaturesSection from './sections/features-section';
import FinalCtaSection from './sections/final-cta-section';
import AdvantagesSection from './sections/advantages-section';
import AboutAuthorSection from './sections/about-author-section';

export default function LandingView() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingHeader />

      <Box component="main" sx={{ flex: 1 }}>
        <HeroSection />
        <AdvantagesSection />
        <FeaturesSection />
        <AboutAuthorSection />
        <FinalCtaSection />
      </Box>

      <LandingFooter />
    </Box>
  );
}
