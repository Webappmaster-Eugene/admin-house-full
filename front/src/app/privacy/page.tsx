import type { Metadata } from 'next';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SITE_URL } from 'src/utils/const/seo';

import { LegalPageLayout } from 'src/widgets/legal';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description:
    'Политика конфиденциальности платформы SMETAS — порядок сбора, обработки и хранения персональных данных.',
  alternates: { canonical: `${SITE_URL}/privacy` },
};

// ----------------------------------------------------------------------

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Политика конфиденциальности" lastUpdated="16.04.2026">
      <Stack spacing={4}>
        {/* 1. Общие положения */}
        <Box>
          <Typography variant="h5" gutterBottom>
            1. Общие положения
          </Typography>
          <Typography variant="body1" paragraph>
            Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок сбора,
            обработки, хранения, использования и защиты персональных данных пользователей платформы
            SMETAS (далее — «Платформа»), расположенной по адресу {SITE_URL}.
          </Typography>
          <Typography variant="body1" paragraph>
            Политика разработана в соответствии с Федеральным законом от 27.07.2006 N 152-ФЗ
            «О персональных данных» и иными нормативными правовыми актами Российской Федерации в
            области персональных данных.
          </Typography>
          <Typography variant="body1" paragraph>
            Регистрируясь на Платформе, Пользователь выражает согласие с условиями настоящей
            Политики. Если Пользователь не согласен с условиями Политики, он обязан прекратить
            использование Платформы.
          </Typography>
        </Box>

        {/* 2. Оператор персональных данных */}
        <Box>
          <Typography variant="h5" gutterBottom>
            2. Оператор персональных данных
          </Typography>
          <Typography variant="body1" paragraph>
            Оператором персональных данных является ИП Надточеев Евгений (далее — «Оператор»).
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

        {/* 3. Определения */}
        <Box>
          <Typography variant="h5" gutterBottom>
            3. Определения
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>
                <strong>Персональные данные</strong> — любая информация, относящаяся прямо или
                косвенно к определённому или определяемому физическому лицу (субъекту персональных
                данных).
              </li>
              <li>
                <strong>Обработка персональных данных</strong> — любое действие (операция) или
                совокупность действий (операций), совершаемых с использованием средств автоматизации
                или без использования таких средств с персональными данными, включая сбор, запись,
                систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу,
                обезличивание, блокирование, удаление, уничтожение.
              </li>
              <li>
                <strong>Пользователь</strong> — физическое или юридическое лицо, зарегистрированное
                на Платформе.
              </li>
              <li>
                <strong>Cookies</strong> — небольшие текстовые файлы, отправляемые сервером и
                хранимые на устройстве Пользователя.
              </li>
            </ul>
          </Typography>
        </Box>

        {/* 4. Состав собираемых данных */}
        <Box>
          <Typography variant="h5" gutterBottom>
            4. Состав собираемых данных
          </Typography>
          <Typography variant="body1" paragraph>
            Оператор собирает и обрабатывает следующие персональные данные Пользователя:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>имя (ФИО или псевдоним, указанный при регистрации);</li>
              <li>адрес электронной почты (email);</li>
              <li>пароль (хранится исключительно в захешированном виде);</li>
              <li>данные рабочих пространств (названия, настройки, содержимое смет);</li>
              <li>загруженные файлы (хранятся в S3-совместимом хранилище MinIO);</li>
              <li>IP-адрес;</li>
              <li>
                данные cookies (техническая информация для обеспечения авторизации и работы
                Платформы).
              </li>
            </ul>
          </Typography>
        </Box>

        {/* 5. Цели обработки персональных данных */}
        <Box>
          <Typography variant="h5" gutterBottom>
            5. Цели обработки персональных данных
          </Typography>
          <Typography variant="body1" paragraph>
            Персональные данные обрабатываются в следующих целях:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>регистрация и идентификация Пользователя на Платформе;</li>
              <li>предоставление доступа к функционалу Платформы;</li>
              <li>обеспечение безопасности аккаунта (авторизация, восстановление пароля);</li>
              <li>связь с Пользователем по вопросам работы Платформы;</li>
              <li>улучшение качества работы Платформы и устранение технических неполадок;</li>
              <li>исполнение обязательств по договору-оферте.</li>
            </ul>
          </Typography>
        </Box>

        {/* 6. Правовые основания обработки */}
        <Box>
          <Typography variant="h5" gutterBottom>
            6. Правовые основания обработки
          </Typography>
          <Typography variant="body1" paragraph>
            Обработка персональных данных осуществляется на основании:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>согласия Пользователя (ст. 6 п. 1 пп. 1 ФЗ N 152-ФЗ);</li>
              <li>
                исполнения договора, стороной которого является Пользователь (ст. 6 п. 1 пп. 5 ФЗ
                N 152-ФЗ);
              </li>
              <li>
                законных интересов Оператора (обеспечение безопасности, предотвращение мошенничества).
              </li>
            </ul>
          </Typography>
        </Box>

        {/* 7. Сроки обработки и хранения */}
        <Box>
          <Typography variant="h5" gutterBottom>
            7. Сроки обработки и хранения
          </Typography>
          <Typography variant="body1" paragraph>
            Персональные данные обрабатываются и хранятся в течение всего срока действия аккаунта
            Пользователя на Платформе.
          </Typography>
          <Typography variant="body1" paragraph>
            При удалении аккаунта персональные данные подлежат уничтожению в течение 30 (тридцати)
            календарных дней, за исключением случаев, когда законодательством Российской Федерации
            предусмотрены иные сроки хранения.
          </Typography>
          <Typography variant="body1" paragraph>
            Резервные копии, содержащие персональные данные удалённых аккаунтов, уничтожаются в
            течение 90 (девяноста) календарных дней.
          </Typography>
        </Box>

        {/* 8. Передача данных третьим лицам */}
        <Box>
          <Typography variant="h5" gutterBottom>
            8. Передача данных третьим лицам
          </Typography>
          <Typography variant="body1" paragraph>
            Оператор не продаёт, не обменивает и не передаёт персональные данные Пользователей
            третьим лицам в коммерческих целях.
          </Typography>
          <Typography variant="body1" paragraph>
            Передача персональных данных возможна в следующих случаях:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>с согласия Пользователя;</li>
              <li>
                по запросу уполномоченных государственных органов в случаях, предусмотренных
                законодательством РФ;
              </li>
              <li>
                для обеспечения работы Платформы (хостинг-провайдер) — при этом с контрагентами
                заключены соответствующие соглашения о конфиденциальности.
              </li>
            </ul>
          </Typography>
        </Box>

        {/* 9. Трансграничная передача данных */}
        <Box>
          <Typography variant="h5" gutterBottom>
            9. Трансграничная передача данных
          </Typography>
          <Typography variant="body1" paragraph>
            Все персональные данные Пользователей хранятся и обрабатываются на серверах,
            расположенных на территории Российской Федерации, в соответствии с требованиями
            ФЗ N 152-ФЗ.
          </Typography>
          <Typography variant="body1" paragraph>
            Трансграничная передача персональных данных не осуществляется.
          </Typography>
        </Box>

        {/* 10. Cookies */}
        <Box>
          <Typography variant="h5" gutterBottom>
            10. Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Платформа использует cookies для обеспечения авторизации и корректной работы сервиса.
            Подробная информация об использовании cookies приведена в{' '}
            <Typography
              component="a"
              href="/cookies"
              variant="body1"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              Политике использования cookies
            </Typography>
            .
          </Typography>
        </Box>

        {/* 11. Меры безопасности */}
        <Box>
          <Typography variant="h5" gutterBottom>
            11. Меры безопасности
          </Typography>
          <Typography variant="body1" paragraph>
            Оператор принимает необходимые организационные и технические меры для защиты персональных
            данных от несанкционированного доступа, уничтожения, изменения, блокирования, копирования
            и распространения:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>передача данных осуществляется по защищённому протоколу HTTPS (TLS/SSL);</li>
              <li>пароли хранятся исключительно в захешированном виде (bcrypt);</li>
              <li>авторизация реализована с использованием JWT-токенов (access + refresh);</li>
              <li>регулярное резервное копирование базы данных;</li>
              <li>ограничение доступа к серверной инфраструктуре.</li>
            </ul>
          </Typography>
        </Box>

        {/* 12. Права пользователя */}
        <Box>
          <Typography variant="h5" gutterBottom>
            12. Права пользователя
          </Typography>
          <Typography variant="body1" paragraph>
            Пользователь имеет следующие права в отношении своих персональных данных:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>право на доступ к своим персональным данным;</li>
              <li>право на уточнение (изменение, дополнение) своих данных;</li>
              <li>право на удаление персональных данных (удаление аккаунта);</li>
              <li>право на отзыв согласия на обработку персональных данных;</li>
              <li>
                право на обращение в Роскомнадзор (Федеральная служба по надзору в сфере связи,
                информационных технологий и массовых коммуникаций) в случае нарушения прав субъекта
                персональных данных.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            Для реализации указанных прав Пользователь может направить запрос на адрес электронной
            почты{' '}
            <Typography
              component="a"
              href="mailto:support@hhos.ru"
              variant="body1"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              support@hhos.ru
            </Typography>
            . Запрос будет рассмотрен в течение 10 (десяти) рабочих дней.
          </Typography>
        </Box>

        {/* 13. Обязанности оператора */}
        <Box>
          <Typography variant="h5" gutterBottom>
            13. Обязанности оператора
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>
                обеспечивать обработку персональных данных в соответствии с законодательством РФ;
              </li>
              <li>
                принимать меры для защиты персональных данных от несанкционированного доступа;
              </li>
              <li>
                предоставлять Пользователю информацию о составе и порядке обработки его данных по
                запросу;
              </li>
              <li>
                прекратить обработку персональных данных при отзыве согласия Пользователем и удалить
                данные в установленные сроки.
              </li>
            </ul>
          </Typography>
        </Box>

        {/* 14. Изменение политики */}
        <Box>
          <Typography variant="h5" gutterBottom>
            14. Изменение политики
          </Typography>
          <Typography variant="body1" paragraph>
            Оператор вправе вносить изменения в настоящую Политику. Новая редакция Политики вступает
            в силу с момента её размещения на Платформе, если иное не предусмотрено новой редакцией.
          </Typography>
          <Typography variant="body1" paragraph>
            Продолжение использования Платформы после внесения изменений означает согласие
            Пользователя с обновлённой Политикой.
          </Typography>
        </Box>

        {/* 15. Контактная информация */}
        <Box>
          <Typography variant="h5" gutterBottom>
            15. Контактная информация
          </Typography>
          <Typography variant="body1" paragraph>
            По вопросам, связанным с обработкой персональных данных, Пользователь может обратиться:
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
                Электронная почта (дополнительная):{' '}
                <Typography
                  component="a"
                  href="mailto:johnn.hotmail@mail.ru"
                  variant="body1"
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  johnn.hotmail@mail.ru
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
