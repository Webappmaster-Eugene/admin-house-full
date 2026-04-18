'use client';

import { useMemo } from 'react';

import { Autocomplete, TextField } from '@mui/material';

/** Опция единицы измерения из справочника handbook'а. */
export interface UnitMeasurementOption {
  uuid: string;
  name: string;
}

interface UnitMeasurementSelectProps {
  /** Текущее значение (строка-имя ед.изм., хранится в снэпшоте строки сметы/шаблона). */
  value: string;
  /** Колбэк изменения. Новое значение — всегда имя единицы (строка). */
  onChange: (nextValue: string) => void;
  /** Список опций из справочника. Если пусто — поле работает как обычный текст. */
  options: UnitMeasurementOption[];
  /** Лейбл поля. */
  label?: string;
  /** Подсказка под полем. */
  helperText?: string;
  /** Обязательное поле. */
  required?: boolean;
  /** Ширина на 100%. */
  fullWidth?: boolean;
  /** Отключить ввод пользовательских значений (freeSolo) — по умолчанию разрешено. */
  strict?: boolean;
  /** Полностью задизейблить поле (read-only для snapshot-полей UNIT/PIE строк). */
  disabled?: boolean;
}

/**
 * Универсальный селект единицы измерения со списком из справочника (FieldUnitMeasurement).
 *
 * По умолчанию работает в режиме freeSolo — позволяет ввести значение, отсутствующее в справочнике
 * (нужно для редких экзотических единиц). В БД всё равно храним как строку-снэпшот.
 *
 * Если `strict=true` — значение можно выбрать только из списка справочника.
 */
export function UnitMeasurementSelect({
  value,
  onChange,
  options,
  label = 'Ед. изм.',
  helperText,
  required,
  fullWidth = true,
  strict = false,
  disabled = false,
}: UnitMeasurementSelectProps) {
  // Пустой справочник — отдельный бранч, чтобы не рендерить пустой Autocomplete.
  const isEmpty = options.length === 0;

  const selectedOption = useMemo<UnitMeasurementOption | null>(
    () => options.find((option) => option.name === value) ?? null,
    [options, value],
  );

  const effectiveHelper =
    helperText ?? (isEmpty ? 'Справочник единиц пуст — введите вручную' : undefined);

  if (isEmpty || strict === false) {
    // freeSolo режим (по умолчанию) или fallback для пустого справочника.
    return (
      <Autocomplete<UnitMeasurementOption, false, false, true>
        freeSolo
        disabled={disabled}
        fullWidth={fullWidth}
        options={options}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
        isOptionEqualToValue={(option, optionValue) => option.name === optionValue.name}
        value={selectedOption ?? value ?? ''}
        onChange={(_event, next) => {
          if (next == null) {
            onChange('');
            return;
          }
          onChange(typeof next === 'string' ? next : next.name);
        }}
        onInputChange={(_event, nextInput, reason) => {
          // reason === 'input' — пользователь вводит текст вручную; 'reset'/'clear' игнорируем
          // (их обрабатывает onChange, чтобы не затереть выбранную опцию).
          if (reason === 'input') onChange(nextInput);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required={required}
            helperText={effectiveHelper}
          />
        )}
      />
    );
  }

  // strict-режим — только выбор из справочника.
  return (
    <Autocomplete<UnitMeasurementOption, false, false, false>
      disabled={disabled}
      fullWidth={fullWidth}
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, optionValue) => option.name === optionValue.name}
      value={selectedOption}
      onChange={(_event, next) => onChange(next?.name ?? '')}
      renderInput={(params) => (
        <TextField {...params} label={label} required={required} helperText={effectiveHelper} />
      )}
    />
  );
}
