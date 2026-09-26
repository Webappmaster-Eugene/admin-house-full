import { domMax } from 'framer-motion';

// Отдельный модуль, чтобы набор фич framer-motion попадал в свой чанк и грузился асинхронно
// (см. motion-lazy.tsx), а не в общий бандл каждой страницы.
export default domMax;
