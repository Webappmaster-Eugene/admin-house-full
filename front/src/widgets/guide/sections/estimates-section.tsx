'use client';

import { useState } from 'react';

import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';

import { guideContent } from '../_content';
import { GuideDetailBlock } from './guide-detail-block';
import { GuideScreenshot } from './guide-screenshot';

const ROW_TYPES_BLOCK_INDEX = 2;

export function EstimatesSection() {
  const [tab, setTab] = useState<'manual' | 'unit' | 'pie'>('manual');
  const activeRowType = guideContent.estimates.rowTypes.find(
    (rt) => rt.kind === tab,
  );

  return (
    <Box id="estimates" sx={{ mb: 8, scrollMarginTop: 80 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {guideContent.estimates.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 820, lineHeight: 1.65 }}
      >
        {guideContent.estimates.lead}
      </Typography>

      {guideContent.estimates.blocks.map((block, idx) => (
        <Box key={block.title}>
          <GuideDetailBlock block={block} />
          {idx === ROW_TYPES_BLOCK_INDEX && (
            <Paper
              variant="outlined"
              sx={{
                mb: 3,
                borderRadius: 2,
                borderColor: 'divider',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                <Tabs
                  value={tab}
                  onChange={(_, value) => setTab(value)}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ px: { xs: 1.5, md: 2 } }}
                >
                  {guideContent.estimates.rowTypes.map((rt) => (
                    <Tab
                      key={rt.kind}
                      value={rt.kind}
                      label={rt.label}
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    />
                  ))}
                </Tabs>
              </Box>
              {activeRowType && (
                <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.65, mb: activeRowType.screenshot ? 2 : 0 }}
                  >
                    {activeRowType.description}
                  </Typography>
                  {activeRowType.screenshot && (
                    <GuideScreenshot screenshot={activeRowType.screenshot} />
                  )}
                </Box>
              )}
            </Paper>
          )}
        </Box>
      ))}
    </Box>
  );
}
