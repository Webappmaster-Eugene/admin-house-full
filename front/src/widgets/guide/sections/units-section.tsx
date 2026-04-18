import { Box, Typography } from '@mui/material';

import { guideContent } from '../_content';
import { GuideDetailBlock } from './guide-detail-block';

export function UnitsSection() {
  return (
    <Box id="units" sx={{ mb: 8, scrollMarginTop: 80 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {guideContent.units.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 820 }}>
        {guideContent.units.lead}
      </Typography>

      {guideContent.units.blocks.map((block) => (
        <GuideDetailBlock key={block.title} block={block} />
      ))}
    </Box>
  );
}
