import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LandingIcon from '../landing-icon';
import SectionHeading from './section-heading';
import { landingNotFor, landingAudiences } from '../landing-content';

// ----------------------------------------------------------------------

// Серверный компонент: в sx только значения-токены темы, без функций.
export default function AudienceSection() {
  return (
    <Box
      component="section"
      aria-labelledby="audience-title"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}
    >
      <Container maxWidth="md">
        <SectionHeading id="audience-title" overline="Для кого" title="Кому подойдёт SMETAS" />

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          }}
        >
          {landingAudiences.map((audience) => (
            <Card key={audience.title} sx={{ p: { xs: 3, md: 4 }, height: '100%', boxShadow: 8 }}>
              <Stack spacing={2}>
                <Box sx={{ color: 'primary.main' }}>
                  <LandingIcon icon={audience.icon} width={36} />
                </Box>
                <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>
                  {audience.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {audience.description}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Box>

        <Typography
          variant="body2"
          sx={{ mt: 4, p: 2.5, borderRadius: 1.5, bgcolor: 'grey.100', color: 'text.secondary' }}
        >
          {landingNotFor}
        </Typography>
      </Container>
    </Box>
  );
}
