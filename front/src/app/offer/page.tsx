import type { Metadata } from 'next';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SITE_URL } from 'src/utils/const/seo';

import { LegalPageLayout } from 'src/widgets/legal';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Публичная оферта',
  description:
    'Публичная оферта платформы SMETAS — условия предоставления доступа к SaaS-сервису для строительных смет.',
  alternates: { canonical: `${SITE_URL}/offer` },
};

// ----------------------------------------------------------------------

export default function OfferPage() {
  return (
    <LegalPageLayout title="Публичная оферта" lastUpdated="16.04.2026">
      <Stack spacing={4}>
        {/* 1. Общие положения */}
        <Box>
          <Typography variant="h5" gutterBottom>
            1. Общие положения
          </Typography>
          <Typography variant="body1" paragraph>
            Настоящий документ является официальным предложением (публичной офертой) ИП Надточеев
            Евгений (далее — «Исполнитель») в адрес любого физического или юридического лица (далее —
            «Заказчик») заключить договор на оказание услуг по предоставлению доступа к платформе
            SMETAS на условиях, изложенных ниже.
          </Typography>
          <Typography variant="body1" paragraph>
            В соответствии со статьями 435 и 437 Гражданского кодекса Российской Федерации настоящий
            документ является публичной офертой. Акцептом оферты является регистрация на Платформе,
            что приравнивается к заключению договора на условиях настоящей оферты (ст. 438 ГК РФ).
          </Typography>
        </Box>

        {/* 2. Предмет оферты */}
        <Box>
          <Typography variant="h5" gutterBottom>
            2. Предмет оферты
          </Typography>
          <Typography variant="body1" paragraph>
            Исполнитель предоставляет Заказчику доступ к SaaS-платформе SMETAS (далее — «Платформа»),
            расположенной по адресу {SITE_URL}, для составления строительных смет и управления
            связанными данными.
          </Typography>
          <Typography variant="body1" paragraph>
            Платформа предоставляется в режиме онлайн-сервиса (Software as a Service). Заказчику
            предоставляется неисключительное, непередаваемое право использования Платформы на условиях
            настоящей оферты.
          </Typography>
        </Box>

        {/* 3. Описание услуг */}
        <Box>
          <Typography variant="h5" gutterBottom>
            3. Описание услуг
          </Typography>
          <Typography variant="body1" paragraph>
            Платформа SMETAS предоставляет Заказчику следующие возможности:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>
                <strong>База материалов</strong> — создание, редактирование и управление справочником
                строительных материалов с характеристиками, ценами и категориями;
              </li>
              <li>
                <strong>Справочники</strong> — настраиваемые справочники категорий, характеристик и
                полей для структурирования данных;
              </li>
              <li>
                <strong>Рабочие пространства</strong> — создание изолированных рабочих пространств
                для организации работы по проектам с возможностью командного доступа;
              </li>
              <li>
                <strong>Файловое хранилище</strong> — загрузка и хранение файлов, связанных с
                проектами и материалами (S3-совместимое хранилище);
              </li>
              <li>
                <strong>API</strong> — программный интерфейс для интеграции с внешними системами
                (при наличии).
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            Конкретный набор функций может отличаться в зависимости от тарифного плана и этапа
            развития Платформы. Исполнитель вправе расширять, изменять или ограничивать функционал
            Платформы.
          </Typography>
        </Box>

        {/* 4. Стоимость услуг и порядок оплаты */}
        <Box>
          <Typography variant="h5" gutterBottom>
            4. Стоимость услуг и порядок оплаты
          </Typography>
          <Typography variant="body1" paragraph>
            На текущий момент доступ к Платформе предоставляется на безвозмездной основе (бесплатный
            тарифный план).
          </Typography>
          <Typography variant="body1" paragraph>
            Исполнитель оставляет за собой право ввести платные тарифные планы в будущем. В этом
            случае Заказчик будет уведомлён о стоимости и условиях платных тарифов не менее чем за 30
            (тридцать) календарных дней до их введения.
          </Typography>
          <Typography variant="body1" paragraph>
            Переход на платный тариф осуществляется исключительно по добровольному выбору Заказчика.
            Доступ к базовому функционалу в рамках бесплатного тарифа сохраняется.
          </Typography>
        </Box>

        {/* 5. Срок действия и расторжение */}
        <Box>
          <Typography variant="h5" gutterBottom>
            5. Срок действия и расторжение
          </Typography>
          <Typography variant="body1" paragraph>
            Договор, заключённый на основании настоящей оферты, действует бессрочно с момента
            регистрации Заказчика на Платформе до момента удаления аккаунта или расторжения договора
            одной из сторон.
          </Typography>
          <Typography variant="body1" paragraph>
            Исполнитель вправе расторгнуть договор в одностороннем порядке в случае нарушения
            Заказчиком условий настоящей оферты или{' '}
            <Typography
              component="a"
              href="/terms"
              variant="body1"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              Пользовательского соглашения
            </Typography>
            .
          </Typography>
        </Box>

        {/* 6. Отказ от услуг */}
        <Box>
          <Typography variant="h5" gutterBottom>
            6. Отказ от услуг
          </Typography>
          <Typography variant="body1" paragraph>
            Заказчик вправе в любое время отказаться от услуг Исполнителя путём удаления своего
            аккаунта на Платформе.
          </Typography>
          <Typography variant="body1" paragraph>
            При удалении аккаунта все данные Заказчика (включая рабочие пространства, загруженные
            файлы и персональные данные) будут удалены в сроки, предусмотренные{' '}
            <Typography
              component="a"
              href="/privacy"
              variant="body1"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              Политикой конфиденциальности
            </Typography>
            .
          </Typography>
        </Box>

        {/* 7. Конфиденциальность */}
        <Box>
          <Typography variant="h5" gutterBottom>
            7. Конфиденциальность
          </Typography>
          <Typography variant="body1" paragraph>
            Порядок сбора, обработки и хранения персональных данных Заказчика определяется{' '}
            <Typography
              component="a"
              href="/privacy"
              variant="body1"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              Политикой конфиденциальности
            </Typography>
            , являющейся неотъемлемой частью настоящей оферты.
          </Typography>
          <Typography variant="body1" paragraph>
            Исполнитель обязуется не разглашать данные рабочих пространств Заказчика третьим лицам,
            за исключением случаев, предусмотренных законодательством Российской Федерации.
          </Typography>
        </Box>

        {/* 8. Ответственность */}
        <Box>
          <Typography variant="h5" gutterBottom>
            8. Ответственность
          </Typography>
          <Typography variant="body1" paragraph>
            Исполнитель прилагает разумные усилия для обеспечения бесперебойной работы Платформы,
            однако не гарантирует её непрерывную и безошибочную работу.
          </Typography>
          <Typography variant="body1" paragraph>
            Исполнитель не несёт ответственности за:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>убытки, возникшие вследствие использования или невозможности использования Платформы;</li>
              <li>корректность сметных расчётов, выполненных Заказчиком с использованием Платформы;</li>
              <li>
                потерю данных, вызванную обстоятельствами, находящимися вне разумного контроля
                Исполнителя;
              </li>
              <li>действия третьих лиц, получивших доступ к аккаунту Заказчика.</li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            Совокупная ответственность Исполнителя по настоящей оферте ограничивается суммой
            фактически произведённых Заказчиком платежей за последние 3 (три) месяца.
          </Typography>
        </Box>

        {/* 9. Форс-мажор */}
        <Box>
          <Typography variant="h5" gutterBottom>
            9. Форс-мажор
          </Typography>
          <Typography variant="body1" paragraph>
            Стороны освобождаются от ответственности за неисполнение или ненадлежащее исполнение
            обязательств, если это вызвано обстоятельствами непреодолимой силы (форс-мажор), включая,
            но не ограничиваясь: стихийные бедствия, войны, забастовки, действия государственных
            органов, сбои в работе телекоммуникационных сетей, DDoS-атаки и иные кибератаки.
          </Typography>
          <Typography variant="body1" paragraph>
            Сторона, для которой наступили форс-мажорные обстоятельства, обязана уведомить другую
            сторону в разумный срок.
          </Typography>
        </Box>

        {/* 10. Порядок разрешения споров */}
        <Box>
          <Typography variant="h5" gutterBottom>
            10. Порядок разрешения споров
          </Typography>
          <Typography variant="body1" paragraph>
            Все споры и разногласия, возникающие в связи с настоящей офертой, стороны будут стремиться
            разрешить путём переговоров.
          </Typography>
          <Typography variant="body1" paragraph>
            Обязательный досудебный порядок урегулирования споров: сторона, имеющая претензию,
            направляет другой стороне письменную претензию на адрес электронной почты. Срок
            рассмотрения претензии — 30 (тридцать) календарных дней.
          </Typography>
          <Typography variant="body1" paragraph>
            При невозможности урегулирования спора в досудебном порядке он подлежит рассмотрению в
            суде по месту нахождения Исполнителя в соответствии с законодательством Российской
            Федерации.
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
