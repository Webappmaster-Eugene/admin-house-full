import { ImageResponse } from 'next/og';

import { AUTHOR, SITE_NAME, SITE_DESCRIPTION, SITE_TITLE_DEFAULT } from 'src/utils/const/seo';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function TwitterImage() {
  const [robotoRegular, robotoBold] = await Promise.all([
    fetch(new URL('./_fonts/Roboto-Regular.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('./_fonts/Roboto-Bold.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          background: 'linear-gradient(135deg, #1877F2 0%, #0C44AE 100%)',
          color: '#ffffff',
          fontFamily: 'Roboto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#ffffff',
              color: '#1877F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            С
          </div>
          <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, letterSpacing: 0.5 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              lineHeight: 1.15,
              fontWeight: 700,
              maxWidth: 1040,
            }}
          >
            {SITE_TITLE_DEFAULT}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              lineHeight: 1.4,
              opacity: 0.92,
              maxWidth: 980,
              fontWeight: 400,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            opacity: 0.85,
            fontWeight: 400,
          }}
        >
          <div style={{ display: 'flex' }}>{`Разработка: ${AUTHOR.name}`}</div>
          <div style={{ display: 'flex' }}>alibaba.hhos.ru</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Roboto', data: robotoRegular, weight: 400, style: 'normal' },
        { name: 'Roboto', data: robotoBold, weight: 700, style: 'normal' },
      ],
    }
  );
}
