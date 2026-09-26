import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import SectionHeading from './section-heading';
import { landingFaq } from '../landing-content';

// ----------------------------------------------------------------------

/**
 * Вопросы и ответы. Все ответы открыты сразу (без аккордеона): текст виден поисковикам и читается
 * без кликов. Те же пары вопрос/ответ выводятся в JSON-LD FAQPage на странице (app/page.tsx).
 */
export default function FaqSection() {
  return (
    <Box
      component="section"
      aria-labelledby="faq-title"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.100' }}
    >
      <Container maxWidth="md">
        <SectionHeading id="faq-title" overline="Вопросы" title="Что важно знать заранее" />

        <Stack
          divider={<Divider flexItem />}
          sx={{ borderRadius: 2, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}
        >
          {landingFaq.map((item) => (
            <Box key={item.question} sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                {item.question}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.answer}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
