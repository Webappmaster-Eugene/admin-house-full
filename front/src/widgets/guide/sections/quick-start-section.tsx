import { Box, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';

import { guideContent } from '../_content';
import { GuideScreenshot } from './guide-screenshot';

export function QuickStartSection() {
  return (
    <Box id="quick-start" sx={{ mb: 8, scrollMarginTop: 80 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {guideContent.quickStart.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 820 }}>
        {guideContent.quickStart.lead}
      </Typography>

      <Stepper orientation="vertical" nonLinear activeStep={-1}>
        {guideContent.quickStart.steps.map((step) => (
          <Step key={step.title} expanded active>
            <StepLabel>
              <Typography variant="h6">{step.title}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {step.description}
              </Typography>
              {step.screenshot && <GuideScreenshot screenshot={step.screenshot} />}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
