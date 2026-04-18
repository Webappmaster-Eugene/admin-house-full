import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { guideContent } from '../_content';

export function FaqSection() {
  return (
    <Box id="faq" sx={{ mb: 8, scrollMarginTop: 80 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {guideContent.faq.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 820 }}>
        {guideContent.faq.lead}
      </Typography>

      {guideContent.faq.items.map((item, idx) => (
        <Accordion key={item.question} disableGutters defaultExpanded={idx === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
