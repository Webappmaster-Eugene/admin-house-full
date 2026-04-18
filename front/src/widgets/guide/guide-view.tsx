import { Box, Container } from '@mui/material';

import { EstimatesSection } from './sections/estimates-section';
import { FaqSection } from './sections/faq-section';
import { GlossarySection } from './sections/glossary-section';
import { HandbookSection } from './sections/handbook-section';
import { HeroSection } from './sections/hero-section';
import { PiesSection } from './sections/pies-section';
import { QuickStartSection } from './sections/quick-start-section';
import { UnitsSection } from './sections/units-section';

export function GuideView() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <HeroSection />
        <QuickStartSection />
        <GlossarySection />
        <HandbookSection />
        <EstimatesSection />
        <UnitsSection />
        <PiesSection />
        <FaqSection />
      </Box>
    </Container>
  );
}
