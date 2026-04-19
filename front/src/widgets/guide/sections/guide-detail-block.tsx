import { Box, Paper, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { GuideDetailBlock as GuideDetailBlockType } from '../_types';
import { GuideScreenshot } from './guide-screenshot';

interface GuideDetailBlockProps {
  block: GuideDetailBlockType;
}

export function GuideDetailBlock({ block }: GuideDetailBlockProps) {
  const hasBullets = !!block.bullets?.length;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2.5, md: 3 },
        mb: 3,
        borderRadius: 2,
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" sx={{ mb: 1.25, fontWeight: 600 }}>
        {block.title}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mb: hasBullets || block.screenshot ? 2 : 0,
          lineHeight: 1.65,
        }}
      >
        {block.body}
      </Typography>

      {hasBullets && (
        <Box
          sx={{
            mb: block.screenshot ? 2 : 0,
            p: 2,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        >
          <Stack spacing={1.25}>
            {block.bullets!.map((item) => (
              <Stack
                direction="row"
                spacing={1.25}
                key={item}
                alignItems="flex-start"
              >
                <CheckIcon
                  fontSize="small"
                  color="success"
                  sx={{ mt: '2px', flexShrink: 0 }}
                />
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {block.screenshot && <GuideScreenshot screenshot={block.screenshot} />}
    </Paper>
  );
}
