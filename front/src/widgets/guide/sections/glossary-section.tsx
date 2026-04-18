import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { guideContent } from '../_content';

export function GlossarySection() {
  return (
    <Box id="glossary" sx={{ mb: 8, scrollMarginTop: 80 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {guideContent.glossary.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 820 }}>
        {guideContent.glossary.lead}
      </Typography>

      <Grid container spacing={2}>
        {guideContent.glossary.items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.term}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.term}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.definition}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
