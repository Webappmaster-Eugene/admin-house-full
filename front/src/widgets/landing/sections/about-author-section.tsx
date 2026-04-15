'use client';

import {
  Box,
  Card,
  Grid,
  Link,
  Stack,
  Avatar,
  Container,
  Typography,
} from '@mui/material';

import Iconify from 'src/shared/iconify';

import { landingAuthor } from '../landing-content';

export default function AboutAuthorSection() {
  return (
    <Box
      component="section"
      id="author"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 4, md: 6 }}>
          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography variant="overline" sx={{ color: 'primary.main' }}>
              О разработчике
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Создатель проекта
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 640 }}
            >
              Этот продукт разрабатывается и сопровождается одним человеком. Вы всегда можете
              связаться со мной напрямую — по любым вопросам, предложениям или доработкам.
            </Typography>
          </Stack>

          <Card
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              boxShadow: (theme) => theme.customShadows?.z12 ?? theme.shadows[6],
            }}
          >
            <Grid container spacing={{ xs: 3, md: 5 }} alignItems="stretch">
              <Grid item xs={12} md={4}>
                <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                  <Avatar
                    sx={{
                      width: { xs: 120, md: 160 },
                      height: { xs: 120, md: 160 },
                      fontSize: { xs: 44, md: 60 },
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    }}
                  >
                    ЕН
                  </Avatar>
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography component="h4" variant="h5" sx={{ fontWeight: 700 }}>
                      {landingAuthor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'primary.main', fontWeight: 500, mt: 0.5 }}
                    >
                      {landingAuthor.role}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {landingAuthor.bio}
                  </Typography>

                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      Контакты
                    </Typography>
                    <Grid container spacing={1.5}>
                      {landingAuthor.contacts.map((contact) => (
                        <Grid item xs={12} sm={6} key={contact.type}>
                          <Link
                            href={contact.href}
                            target={contact.href.startsWith('http') ? '_blank' : undefined}
                            rel={
                              contact.href.startsWith('http') ? 'noopener noreferrer' : undefined
                            }
                            underline="none"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              p: 1.5,
                              borderRadius: 1.5,
                              border: (theme) => `1px solid ${theme.palette.divider}`,
                              transition: 'all 0.2s',
                              '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: 'action.hover',
                              },
                            }}
                          >
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'primary.lighter',
                                color: 'primary.main',
                                flexShrink: 0,
                              }}
                            >
                              <Iconify icon={contact.icon} width={20} />
                            </Box>
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography
                                variant="caption"
                                sx={{ color: 'text.secondary', display: 'block' }}
                              >
                                {contact.label}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'text.primary',
                                  fontWeight: 500,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {contact.value}
                              </Typography>
                            </Box>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
