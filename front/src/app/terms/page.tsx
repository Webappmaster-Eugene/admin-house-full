import type { Metadata } from 'next';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SITE_URL } from 'src/utils/const/seo';

import { LegalPageLayout } from 'src/widgets/legal';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Пользовательское соглашение',
  description:
    'Пользовательское соглашение платформы SMETAS — условия использования сервиса для составления строительных смет.',
  alternates: { canonical: `${SITE_URL}/terms` },
};

// ----------------------------------------------------------------------

export default function TermsPage() {
  return (
    <LegalPageLayout title="Пользовательское соглашение" lastUpdated="16.04.2026">
      <Stack spacing={4}>
        {/* 1. Общие положения */}
        <Box>
          <Typography variant="h5" gutterBottom>
            1. Общие положения
          </Typography>
          <Typography variant="body1" paragraph>
            Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между
            ИП Надточеев Евгений (далее — «Администрация») и физическим или юридическим лицом (далее
            — «Пользователь»), использующим платформу SMETAS (далее — «Платформа»), расположенную в
            сети Интернет по адресу {SITE_URL}.
          </Typography>
          <Typography variant="body1" paragraph>
            Регистрация на Платформе, а также использование Платформы любым способом означает полное и
            безоговорочное принятие Пользователем условий настоящего Соглашения в соответствии со
            статьёй 438 Гражданского кодекса Российской Федерации.
          </Typography>
          <Typography variant="body1" paragraph>
            Если Пользователь не согласен с условиями Соглашения, он обязан прекратить использование
            Платформы.
          </Typography>
        </Box>

        {/* 2. Предмет соглашения */}
        <Box>
          <Typography variant="h5" gutterBottom>
            2. Предмет соглашения
          </Typography>
          <Typography variant="body1" paragraph>
            Администрация предоставляет Пользователю право использования Платформы SMETAS —
            SaaS-сервиса для составления строительных смет, управления базой материалов, справочниками
            и рабочими пространствами, а также командной работы и файлового хранилища.
          </Typography>
          <Typography variant="body1" paragraph>
            Доступ к функционалу Платформы предоставляется после прохождения процедуры регистрации.
            Объём функционала может различаться в зависимости от тарифного плана.
          </Typography>
        </Box>

        {/* 3. Права и обязанности сторон */}
        <Box>
          <Typography variant="h5" gutterBottom>
            3. Права и обязанности сторон
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 600, mt: 1, mb: 0.5 }}>
            3.1. Пользователь обязуется:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>
                предоставить достоверные данные при регистрации и поддерживать их в актуальном
                состоянии;
              </li>
              <li>не передавать свои учётные данные третьим лицам;</li>
              <li>
                не использовать Платформу для действий, нарушающих законодательство Российской
                Федерации;
              </li>
              <li>
                не предпринимать действий, направленных на нарушение работоспособности Платформы;
              </li>
              <li>
                не копировать, не распространять и не модифицировать контент Платформы без
                письменного согласия Администрации.
              </li>
            </ul>
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 600, mt: 2, mb: 0.5 }}>
            3.2. Пользователь имеет право:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>использовать функционал Платформы в рамках предоставленного доступа;</li>
              <li>обращаться в службу поддержки по вопросам работы Платформы;</li>
              <li>удалить свой аккаунт и прекратить использование Платформы в любое время.</li>
            </ul>
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 600, mt: 2, mb: 0.5 }}>
            3.3. Администрация обязуется:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>обеспечивать работоспособность Платформы в рамках технических возможностей;</li>
              <li>
                обеспечивать сохранность данных Пользователя в соответствии с Политикой
                конфиденциальности;
              </li>
              <li>уведомлять Пользователей об изменениях в условиях Соглашения.</li>
            </ul>
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 600, mt: 2, mb: 0.5 }}>
            3.4. Администрация имеет право:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>изменять функционал Платформы без предварительного уведомления;</li>
              <li>
                приостановить или прекратить доступ Пользователя при нарушении условий настоящего
                Соглашения;
              </li>
              <li>
                проводить профилактические работы с временным ограничением доступа к Платформе.
              </li>
            </ul>
          </Typography>
        </Box>

        {/* 4. Персональные данные */}
        <Box>
          <Typography variant="h5" gutterBottom>
            4. Персональные данные
          </Typography>
          <Typography variant="body1" paragraph>
            Обработка персональных данных Пользователя осуществляется в соответствии с
            Федеральным законом от 27.07.2006 N 152-ФЗ «О персональных данных» и{' '}
            <Typography
              component="a"
              href="/privacy"
              variant="body1"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              Политикой конфиденциальности
            </Typography>{' '}
            Платформы.
          </Typography>
          <Typography variant="body1" paragraph>
            Регистрируясь на Платформе, Пользователь даёт согласие на обработку своих персональных
            данных на условиях, определённых Политикой конфиденциальности.
          </Typography>
        </Box>

        {/* 5. Отказ от ответственности */}
        <Box>
          <Typography variant="h5" gutterBottom>
            5. Отказ от ответственности
          </Typography>
          <Typography variant="body1" paragraph>
            Платформа предоставляется «как есть» (as is). Администрация не гарантирует, что
            Платформа будет соответствовать всем требованиям Пользователя, будет работать
            непрерывно, быстро, надёжно и без ошибок.
          </Typography>
          <Typography variant="body1" paragraph>
            Администрация не несёт ответственности за убытки, возникшие в результате использования
            или невозможности использования Платформы, включая упущенную выгоду.
          </Typography>
          <Typography variant="body1" paragraph>
            Сметные расчёты, формируемые с помощью Платформы, носят информационный характер.
            Пользователь самостоятельно несёт ответственность за корректность вводимых данных и
            итоговых расчётов.
          </Typography>
        </Box>

        {/* 6. Интеллектуальная собственность */}
        <Box>
          <Typography variant="h5" gutterBottom>
            6. Интеллектуальная собственность
          </Typography>
          <Typography variant="body1" paragraph>
            Все исключительные права на Платформу, включая программный код, дизайн, товарные знаки,
            логотипы, тексты и иные элементы, принадлежат Администрации.
          </Typography>
          <Typography variant="body1" paragraph>
            Пользователь сохраняет права на контент, загруженный им на Платформу (файлы, данные
            рабочих пространств). При этом Пользователь предоставляет Администрации неисключительное
            право на хранение и обработку такого контента в целях функционирования Платформы.
          </Typography>
        </Box>

        {/* 7. Ответственность сторон */}
        <Box>
          <Typography variant="h5" gutterBottom>
            7. Ответственность сторон
          </Typography>
          <Typography variant="body1" paragraph>
            Стороны несут ответственность за неисполнение или ненадлежащее исполнение своих
            обязательств в соответствии с законодательством Российской Федерации и настоящим
            Соглашением.
          </Typography>
          <Typography variant="body1" paragraph>
            Пользователь несёт полную ответственность за сохранность своих учётных данных (логин и
            пароль). Все действия, совершённые с использованием учётных данных Пользователя,
            считаются действиями самого Пользователя.
          </Typography>
          <Typography variant="body1" paragraph>
            Совокупная ответственность Администрации по любым требованиям, вытекающим из настоящего
            Соглашения, ограничивается суммой платежей, фактически произведённых Пользователем за
            последние 3 (три) месяца использования Платформы.
          </Typography>
        </Box>

        {/* 8. Разрешение споров */}
        <Box>
          <Typography variant="h5" gutterBottom>
            8. Разрешение споров
          </Typography>
          <Typography variant="body1" paragraph>
            Все споры и разногласия, возникающие из настоящего Соглашения, стороны будут стремиться
            разрешить путём переговоров.
          </Typography>
          <Typography variant="body1" paragraph>
            Обязательный досудебный порядок урегулирования споров: сторона, имеющая претензию,
            направляет другой стороне письменную претензию на электронный адрес. Срок рассмотрения
            претензии составляет 30 (тридцать) календарных дней с момента её получения.
          </Typography>
          <Typography variant="body1" paragraph>
            При невозможности разрешения спора в досудебном порядке он передаётся на рассмотрение в
            суд по месту нахождения Администрации в соответствии с законодательством Российской
            Федерации.
          </Typography>
        </Box>

        {/* 9. Изменение условий */}
        <Box>
          <Typography variant="h5" gutterBottom>
            9. Изменение условий
          </Typography>
          <Typography variant="body1" paragraph>
            Администрация вправе в одностороннем порядке изменять условия настоящего Соглашения.
            Изменения вступают в силу с момента публикации новой редакции Соглашения на Платформе.
          </Typography>
          <Typography variant="body1" paragraph>
            Продолжение использования Платформы после внесения изменений означает согласие
            Пользователя с новой редакцией Соглашения. Пользователь обязуется самостоятельно
            отслеживать изменения.
          </Typography>
        </Box>

        {/* 10. Применимое право */}
        <Box>
          <Typography variant="h5" gutterBottom>
            10. Применимое право
          </Typography>
          <Typography variant="body1" paragraph>
            Настоящее Соглашение регулируется и толкуется в соответствии с законодательством
            Российской Федерации. Вопросы, не урегулированные Соглашением, подлежат разрешению в
            соответствии с действующим законодательством РФ.
          </Typography>
        </Box>

        {/* 11. Контактная информация */}
        <Box>
          <Typography variant="h5" gutterBottom>
            11. Контактная информация
          </Typography>
          <Typography variant="body1" paragraph>
            ИП Надточеев Евгений
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
