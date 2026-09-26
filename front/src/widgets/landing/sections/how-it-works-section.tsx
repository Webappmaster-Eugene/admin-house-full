import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LandingIcon from '../landing-icon';
import SectionHeading from './section-heading';
import { visuallyHiddenSx } from './landing-styles';
import {
  landingSteps,
  HOW_IT_WORKS_ID,
  LandingScreenshot,
  landingPriceFormula,
} from '../landing-content';

// ----------------------------------------------------------------------

// Размер кадров: окно 1440×900 при плотности 2 (scripts/harness/landing-screenshots.mjs).
const SCREENSHOT_WIDTH = 2880;
const SCREENSHOT_HEIGHT = 1800;

function ScreenshotFrame({ screenshot }: { screenshot: LandingScreenshot }) {
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
          boxShadow: 16,
          bgcolor: 'background.paper',
        }}
      >
        {/* Полоска окна браузера — подсказывает, что это экран приложения, а не иллюстрация. */}
        <Stack
          direction="row"
          spacing={0.75}
          aria-hidden
          sx={{ px: 1.5, py: 1, bgcolor: 'grey.200', borderBottom: 1, borderColor: 'divider' }}
        >
          {['error.light', 'warning.light', 'success.light'].map((color) => (
            <Box key={color} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
          ))}
        </Stack>
        {/* Ссылка на кадр в полном размере: в колонке лендинга мелкий текст интерфейса плохо читается. */}
        <Box
          component="a"
          href={screenshot.src}
          target="_blank"
          rel="noopener"
          sx={{ display: 'block', cursor: 'zoom-in' }}
        >
          <Box
            component="img"
            src={screenshot.src}
            alt={screenshot.alt}
            width={SCREENSHOT_WIDTH}
            height={SCREENSHOT_HEIGHT}
            loading="lazy"
            decoding="async"
            sx={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </Box>
      </Box>
      <Typography
        component="figcaption"
        variant="caption"
        sx={{ display: 'block', mt: 1.5, color: 'text.secondary', textAlign: 'center' }}
      >
        {screenshot.caption} · нажмите, чтобы открыть крупно
      </Typography>
    </Box>
  );
}

// Серверный компонент: текст шагов попадает в HTML и не дублируется в клиентском JS.
export default function HowItWorksSection() {
  return (
    <Box
      component="section"
      id={HOW_IT_WORKS_ID}
      aria-labelledby="how-it-works-title"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.100', scrollMarginTop: 64 }}
    >
      <Container maxWidth="xl">
        <SectionHeading
          id="how-it-works-title"
          overline="Как это работает"
          title="От справочника цен до сметы в Excel"
          subtitle="Пять шагов. Первые три делаются один раз, дальше каждая новая смета собирается из готового."
        />

        <Stack spacing={{ xs: 8, md: 12 }}>
          {landingSteps.map((step, index) => (
            <Box
              key={step.title}
              component="article"
              sx={{
                display: 'grid',
                gap: { xs: 4, md: 6 },
                alignItems: 'center',
                // Чётные шаги — скриншотом влево, чтобы шаги не сливались в одну колонку.
                gridTemplateColumns: { xs: '1fr', md: index % 2 === 1 ? '8fr 4fr' : '4fr 8fr' },
              }}
            >
              <Stack spacing={2.5} sx={{ order: { xs: 0, md: index % 2 === 1 ? 1 : 0 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    aria-hidden
                    sx={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'primary.dark',
                      color: 'common.white',
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography component="h3" variant="h4" sx={{ fontWeight: 700 }}>
                    <Box component="span" sx={visuallyHiddenSx}>
                      {`Шаг ${index + 1}. `}
                    </Box>
                    {step.title}
                  </Typography>
                </Stack>

                <Typography variant="body1" sx={{ fontSize: { md: 18 } }}>
                  {step.lead}
                </Typography>

                {step.example && (
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1.5,
                      bgcolor: 'background.paper',
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="subtitle2" component="p" sx={{ mb: 0.5 }}>
                      {step.example.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {step.example.text}
                    </Typography>
                  </Box>
                )}

                <Stack component="ul" spacing={1.25} sx={{ m: 0, p: 0, listStyle: 'none' }}>
                  {step.points.map((point) => (
                    <Stack
                      key={point}
                      component="li"
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                    >
                      <LandingIcon
                        icon="solar:check-circle-bold"
                        width={20}
                        sx={{ mt: '2px', color: 'success.main' }}
                      />
                      <Typography variant="body2">{point}</Typography>
                    </Stack>
                  ))}
                </Stack>

                {step.note && (
                  <Typography
                    variant="body2"
                    sx={{
                      pl: 2,
                      borderLeft: 3,
                      borderColor: 'warning.main',
                      color: 'text.secondary',
                    }}
                  >
                    {step.note}
                  </Typography>
                )}
              </Stack>

              <Stack
                spacing={3}
                sx={{ order: { xs: 1, md: index % 2 === 1 ? 0 : 1 }, minWidth: 0 }}
              >
                {step.screenshots.map((screenshot) => (
                  <ScreenshotFrame key={screenshot.src} screenshot={screenshot} />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>

        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
          }}
        >
          <Typography component="h3" variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            {landingPriceFormula.title}
          </Typography>
          <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2.5 }}>
            {landingPriceFormula.lines.map((line) => (
              <Typography key={line} component="li" variant="body1">
                {line}
              </Typography>
            ))}
          </Stack>
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            {landingPriceFormula.example}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
