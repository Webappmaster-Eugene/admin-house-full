import { Box, Button, Stack, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { guideContent } from '../_content';

export function HeroSection() {
  return (
    <Box id="hero" sx={{ mb: 6 }}>
      <Stack spacing={2}>
        <Typography variant="h3">{guideContent.hero.title}</Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 820, lineHeight: 1.65 }}
        >
          {guideContent.hero.lead}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
          <Button
            variant="contained"
            size="large"
            href="#quick-start"
            endIcon={<ArrowDownwardIcon />}
          >
            {guideContent.hero.cta}
          </Button>
          <Button variant="outlined" size="large" href="#glossary">
            Сначала — словарь терминов
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
