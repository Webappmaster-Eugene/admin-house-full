import { Box, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { GuideDetailBlock as GuideDetailBlockType } from '../_types';
import { GuideScreenshot } from './guide-screenshot';

interface GuideDetailBlockProps {
  block: GuideDetailBlockType;
}

export function GuideDetailBlock({ block }: GuideDetailBlockProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {block.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: block.bullets?.length ? 2 : 0 }}>
        {block.body}
      </Typography>
      {block.bullets && block.bullets.length > 0 && (
        <Stack spacing={1} sx={{ mb: 2 }}>
          {block.bullets.map((item) => (
            <Stack direction="row" spacing={1} key={item} alignItems="flex-start">
              <CheckIcon fontSize="small" color="success" sx={{ mt: '2px' }} />
              <Typography variant="body2" color="text.primary">
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
      {block.screenshot && <GuideScreenshot screenshot={block.screenshot} />}
    </Box>
  );
}
