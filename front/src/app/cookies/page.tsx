import type { Metadata } from 'next';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SITE_URL } from 'src/utils/const/seo';

import { LegalPageLayout } from 'src/widgets/legal';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Политика использования cookies',
  description:
    'Политика использования cookies платформы SMETAS — какие cookies используются и для чего.',
  alternates: { canonical: `${SITE_URL}/cookies` },
};

// ----------------------------------------------------------------------

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Политика использования cookies" lastUpdated="16.04.2026">
      <Stack spacing={4}>
        {/* 1. Что такое cookies */}
        <Box>
          <Typography variant="h5" gutterBottom>
            1. Что такое cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Cookies (куки) — это небольшие текстовые файлы, которые сохраняются на устройстве
            Пользователя (компьютере, планшете, смартфоне) при посещении веб-сайтов. Cookies
            позволяют Платформе запоминать действия и настройки Пользователя, обеспечивая корректную
            работу сервиса.
          </Typography>
          <Typography variant="body1" paragraph>
            Платформа SMETAS ({SITE_URL}) использует cookies исключительно в технических целях для
            обеспечения работы авторизации и функционала сервиса.
          </Typography>
        </Box>

        {/* 2. Какие cookies мы используем */}
        <Box>
          <Typography variant="h5" gutterBottom>
            2. Какие cookies мы используем
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 600, mt: 1, mb: 0.5 }}>
            2.1. Технические (обязательные) cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Данные cookies необходимы для корректной работы Платформы. Без них авторизация и основные
            функции сервиса будут недоступны.
          </Typography>

          <Box
            component="table"
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              mb: 2,
              '& th, & td': {
                border: '1px solid',
                borderColor: 'divider',
                px: 2,
                py: 1,
                textAlign: 'left',
              },
              '& th': {
                bgcolor: 'action.hover',
                fontWeight: 600,
              },
            }}
          >
            <thead>
              <tr>
                <Typography component="th" variant="body2">
                  Название
                </Typography>
                <Typography component="th" variant="body2">
                  Назначение
                </Typography>
                <Typography component="th" variant="body2">
                  Срок хранения
                </Typography>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Typography component="td" variant="body2">
                  REFRESH_KEY
                </Typography>
                <Typography component="td" variant="body2">
                  Refresh-токен для авторизации. Позволяет Пользователю оставаться авторизованным
                  без повторного ввода логина и пароля.
                </Typography>
                <Typography component="td" variant="body2">
                  До 30 дней
                </Typography>
              </tr>
              <tr>
                <Typography component="td" variant="body2">
                  USED_ACCESS_KEY
                </Typography>
                <Typography component="td" variant="body2">
                  Текущий access-токен для аутентификации запросов к API.
                </Typography>
                <Typography component="td" variant="body2">
                  До 15 минут
                </Typography>
              </tr>
              <tr>
                <Typography component="td" variant="body2">
                  NEW_ACCESS_KEY
                </Typography>
                <Typography component="td" variant="body2">
                  Обновлённый access-токен, полученный при ротации токенов.
                </Typography>
                <Typography component="td" variant="body2">
                  До 15 минут
                </Typography>
              </tr>
              <tr>
                <Typography component="td" variant="body2">
                  Настройки интерфейса
                </Typography>
                <Typography component="td" variant="body2">
                  Предпочтения пользователя: тема оформления, язык интерфейса и другие настройки UI.
                </Typography>
                <Typography component="td" variant="body2">
                  1 год
                </Typography>
              </tr>
            </tbody>
          </Box>

          <Typography variant="body1" sx={{ fontWeight: 600, mt: 2, mb: 0.5 }}>
            2.2. Аналитические cookies
          </Typography>
          <Typography variant="body1" paragraph>
            На текущий момент Платформа не использует аналитические cookies (Яндекс.Метрика,
            Google Analytics и т.п.). При внедрении аналитических инструментов в будущем данный
            раздел будет обновлён, а Пользователи будут уведомлены об изменениях.
          </Typography>
        </Box>

        {/* 3. Управление cookies */}
        <Box>
          <Typography variant="h5" gutterBottom>
            3. Управление cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Пользователь может управлять cookies через настройки своего браузера. Большинство
            современных браузеров позволяют:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>просматривать сохранённые cookies;</li>
              <li>удалять отдельные cookies или все сразу;</li>
              <li>блокировать cookies от определённых сайтов;</li>
              <li>настроить уведомления при установке новых cookies.</li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            Инструкции по управлению cookies доступны в справке вашего браузера:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>
                <Typography
                  component="a"
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body1"
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Google Chrome
                </Typography>
              </li>
              <li>
                <Typography
                  component="a"
                  href="https://support.mozilla.org/ru/kb/udalenie-kukov-i-dannyh-sajtov-v-firefox"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body1"
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Mozilla Firefox
                </Typography>
              </li>
              <li>
                <Typography
                  component="a"
                  href="https://support.apple.com/ru-ru/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body1"
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Safari
                </Typography>
              </li>
              <li>
                <Typography
                  component="a"
                  href="https://support.microsoft.com/ru-ru/microsoft-edge/%D1%83%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2-cookie-%D0%B2-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body1"
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Microsoft Edge
                </Typography>
              </li>
              <li>
                <Typography
                  component="a"
                  href="https://browser.yandex.ru/help/personal-data-protection/cookies.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body1"
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Яндекс.Браузер
                </Typography>
              </li>
            </ul>
          </Typography>
        </Box>

        {/* 4. Блокировка технических cookies */}
        <Box>
          <Typography variant="h5" gutterBottom>
            4. Влияние блокировки cookies
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
            Обратите внимание: блокировка или удаление технических cookies (в первую очередь
            REFRESH_KEY, USED_ACCESS_KEY, NEW_ACCESS_KEY) приведёт к невозможности авторизации на
            Платформе.
          </Typography>
          <Typography variant="body1" paragraph>
            При блокировке технических cookies Пользователь не сможет:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>войти в свой аккаунт;</li>
              <li>оставаться авторизованным между сессиями;</li>
              <li>использовать функционал Платформы, требующий авторизации.</li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            Для корректной работы Платформы рекомендуется разрешить cookies для домена {SITE_URL}.
          </Typography>
        </Box>

        {/* 5. Контактная информация */}
        <Box>
          <Typography variant="h5" gutterBottom>
            5. Контактная информация
          </Typography>
          <Typography variant="body1" paragraph>
            По вопросам, связанным с использованием cookies, обращайтесь:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>
                Электронная почта:{' '}
                <Typography
                  component="a"
                  href="mailto:support@hhos.ru"
                  variant="body1"
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  support@hhos.ru
                </Typography>
              </li>
              <li>
                Telegram:{' '}
                <Typography
                  component="a"
                  href="https://t.me/eugene_nadtocheev"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body1"
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  @eugene_nadtocheev
                </Typography>
              </li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </LegalPageLayout>
  );
}
