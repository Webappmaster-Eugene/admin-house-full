'use client';

import { useState } from 'react';

import { Box, Card, CardContent, Tab, Tabs, Typography } from '@mui/material';

import { guideContent } from '../_content';
import { GuideDetailBlock } from './guide-detail-block';
import { GuideScreenshot } from './guide-screenshot';

export function EstimatesSection() {
  const [tab, setTab] = useState<'manual' | 'unit' | 'pie'>('manual');
  const activeRowType = guideContent.estimates.rowTypes.find((rt) => rt.kind === tab);

  return (
    <Box id="estimates" sx={{ mb: 8, scrollMarginTop: 80 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {guideContent.estimates.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 820 }}>
        {guideContent.estimates.lead}
      </Typography>

      {guideContent.estimates.blocks.map((block, idx) => {
        const isRowTypesAnchor = idx === 2;
        return (
          <Box key={block.title}>
            <GuideDetailBlock block={block} />
            {isRowTypesAnchor && (
              <Card variant="outlined" sx={{ mb: 4 }}>
                <Tabs
                  value={tab}
                  onChange={(_, value) => setTab(value)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {guideContent.estimates.rowTypes.map((rt) => (
                    <Tab key={rt.kind} value={rt.kind} label={rt.label} />
                  ))}
                </Tabs>
                <CardContent>
                  {activeRowType && (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {activeRowType.description}
                      </Typography>
                      {activeRowType.screenshot && (
                        <GuideScreenshot screenshot={activeRowType.screenshot} />
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
