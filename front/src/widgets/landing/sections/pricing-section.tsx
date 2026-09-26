import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/utils/routes/paths';

import LandingIcon from '../landing-icon';
import SectionHeading from './section-heading';
import { landingPricing, ACCESS_REQUEST_HREF } from '../landing-content';

// ----------------------------------------------------------------------

// Серверный компонент: в sx только значения-токены темы, без функций.
export default function PricingSection() {
  return (
    <Box
      component="section"
      aria-labelledby="pricing-title"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}
    >
      <Container maxWidth="sm">
        <SectionHeading
          id="pricing-title"
          overline="Цена"
          title={landingPricing.title}
          subtitle={landingPricing.subtitle}
        />

        <Card sx={{ p: { xs: 4, md: 5 }, textAlign: 'center', borderRadius: 3, boxShadow: 16 }}>
          <Typography component="p" variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
            {landingPricing.price}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            <Link href={paths.offer} underline="always" color="inherit">
              {landingPricing.priceNote}
            </Link>
          </Typography>

          <Stack
            component="ul"
            spacing={1.5}
            sx={{ mb: 4, p: 0, textAlign: 'left', maxWidth: 340, mx: 'auto', listStyle: 'none' }}
          >
            {landingPricing.features.map((feature) => (
              <Stack key={feature} component="li" direction="row" spacing={1.5} alignItems="center">
                <LandingIcon
                  icon="solar:check-circle-bold"
                  width={20}
                  sx={{ color: 'success.main' }}
                />
                <Typography variant="body2">{feature}</Typography>
              </Stack>
            ))}
          </Stack>

          <Button
            href={ACCESS_REQUEST_HREF}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            endIcon={<LandingIcon icon="solar:letter-bold-duotone" />}
            sx={{ py: 1.5, fontSize: 16 }}
          >
            {landingPricing.ctaLabel}
          </Button>
        </Card>
      </Container>
    </Box>
  );
}
