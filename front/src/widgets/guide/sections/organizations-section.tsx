import { Box, Typography } from '@mui/material';

import { guideContent } from '../_content';
import { GuideDetailBlock } from './guide-detail-block';

export function OrganizationsSection() {
  return (
    <Box id="organizations" sx={{ mb: 8, scrollMarginTop: 80 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {guideContent.organizations.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 820, lineHeight: 1.65 }}
      >
        {guideContent.organizations.lead}
      </Typography>

      {guideContent.organizations.blocks.map((block) => (
        <GuideDetailBlock key={block.title} block={block} />
      ))}
    </Box>
  );
}
