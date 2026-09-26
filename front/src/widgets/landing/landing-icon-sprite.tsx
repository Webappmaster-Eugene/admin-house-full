import { landingIconSymbolId } from './landing-icon';
import { LANDING_ICONS, LandingIconName } from './landing-icons';

// ----------------------------------------------------------------------

const ICON_NAMES = Object.keys(LANDING_ICONS) as LandingIconName[];

/**
 * SVG-спрайт иконок лендинга. Серверный компонент: разметка иконок попадает в HTML один раз
 * и не дублируется в клиентском JS. Рендерится в LandingView до секций.
 * Спрятан через нулевой размер, а не display: none — так <use> надёжно работает во всех браузерах.
 */
export default function LandingIconSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      {ICON_NAMES.map((name) => {
        const { body, width, height } = LANDING_ICONS[name];
        return (
          <symbol
            key={name}
            id={landingIconSymbolId(name)}
            viewBox={`0 0 ${width} ${height}`}
            // Данные статичны и сгенерированы из Iconify (scripts/generate-landing-icons.mjs), ввода пользователя нет.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: body }}
          />
        );
      })}
    </svg>
  );
}
