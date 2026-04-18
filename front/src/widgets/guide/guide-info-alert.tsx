'use client';

import { useEffect, useState } from 'react';
import NextLink from 'next/link';

import { Alert, AlertTitle, Button, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { paths } from 'src/utils/routes/paths';

import { GuideAnchor } from './_types';

const STORAGE_PREFIX = 'guide-hint-dismissed:';

const HINT_COPY: Record<GuideAnchor, { title: string; body: string }> = {
  'quick-start': {
    title: 'Впервые здесь? Начните с быстрого старта',
    body: 'Пять шагов от пустого workspace до готовой сметы: справочник → шаблоны → проект → смета → экспорт.',
  },
  handbook: {
    title: 'Справочник — фундамент всех смет',
    body: 'Наполните категории и материалы один раз — и добавляйте их в любую смету одним кликом. Цены и характеристики сохраняются в истории.',
  },
  estimates: {
    title: 'Как работают сметы в Admin House',
    body: 'Смета = иерархия разделов (до 2 уровней) + строки 3 типов: вручную, из единички, из пирога. Итоги пересчитываются автоматически, экспорт в Excel — одной кнопкой.',
  },
  units: {
    title: 'Единички ускоряют составление смет',
    body: 'Шаблон «материал + работа на 1 ед.» (например, «Монтаж окна 1 м²»). Создайте один раз — используйте в любой смете с любым количеством.',
  },
  pies: {
    title: 'Пироги — для многослойных конструкций',
    body: 'Шаблон «стена/пол/перекрытие» со слоями. Цена за м² агрегируется из слоёв с учётом расхода материала на м².',
  },
  faq: {
    title: 'Ответы на частые вопросы',
    body: 'Snapshot, inline-редактирование, экспорт в PDF, история цен и другое — в разделе FAQ.',
  },
};

interface GuideInfoAlertProps {
  section: GuideAnchor;
  variant?: 'default' | 'compact';
}

export function GuideInfoAlert({ section, variant = 'default' }: GuideInfoAlertProps) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const flag = window.localStorage.getItem(`${STORAGE_PREFIX}${section}`);
      setDismissed(flag === '1');
    } catch {
      setDismissed(false);
    }
  }, [section]);

  if (dismissed) return null;

  const copy = HINT_COPY[section];
  const href = `${paths.dashboard.guide}#${section}`;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}${section}`, '1');
    } catch {
      // localStorage недоступен — состояние удержится только в памяти до перезагрузки.
    }
  };

  return (
    <Alert
      severity="info"
      variant="outlined"
      sx={{ mb: variant === 'compact' ? 2 : 3 }}
      action={
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            component={NextLink}
            href={href}
            size="small"
            color="info"
            variant="contained"
          >
            Подробнее
          </Button>
          <IconButton size="small" onClick={handleDismiss} aria-label="Скрыть подсказку">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      }
    >
      {variant === 'default' && <AlertTitle>{copy.title}</AlertTitle>}
      {variant === 'compact' ? <strong>{copy.title}.</strong> : null} {copy.body}
    </Alert>
  );
}
