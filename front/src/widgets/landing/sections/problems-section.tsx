import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LandingIcon from '../landing-icon';
import SectionHeading from './section-heading';
import { landingProblems } from '../landing-content';

// ----------------------------------------------------------------------

// Серверный компонент: в sx только значения-токены темы, без функций.
export default function ProblemsSection() {
  return (
    <Box
      component="section"
      aria-labelledby="problems-title"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          id="problems-title"
          overline="Зачем это нужно"
          title="Что меняется по сравнению со сметой в Excel"
        />

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          }}
        >
          {landingProblems.map((item) => (
            <Card key={item.title} sx={{ p: { xs: 3, md: 4 }, height: '100%', boxShadow: 8 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                  }}
                >
                  <LandingIcon icon={item.icon} width={28} />
                </Box>

                <Stack spacing={1.5}>
                  <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.problem}
                  </Typography>
                  <Typography variant="body2">{item.solution}</Typography>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
