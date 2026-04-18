import { ReactNode } from 'react';
import { Chip } from '@mui/material';

import { EstimateSectionTree } from 'src/shared/contracts/estimate';

/** Плоский список всех разделов и подразделов с пронумерованными лейблами для select. */
export function flattenSections(
  sections: EstimateSectionTree[],
  prefix = ''
): { uuid: string; label: string }[] {
  const out: { uuid: string; label: string }[] = [];
  sections.forEach((s, idx) => {
    const label = prefix ? `${prefix}.${idx + 1} ${s.name}` : `${idx + 1}. ${s.name}`;
    out.push({ uuid: s.uuid, label });
    out.push(...flattenSections(s.childSections, prefix ? `${prefix}.${idx + 1}` : `${idx + 1}`));
  });
  return out;
}

/** Рекурсивный поиск раздела по uuid в дереве. */
export function findSection(
  sections: EstimateSectionTree[],
  uuid: string
): EstimateSectionTree | null {
  return sections.reduce<EstimateSectionTree | null>((found, section) => {
    if (found) return found;
    if (section.uuid === uuid) return section;
    return findSection(section.childSections, uuid);
  }, null);
}

/** Отображение типа строки: для UNIT/PIE — цветной chip, иначе текстовый лейбл. */
export function renderTypeLabel(isUnit: boolean, isPie: boolean, typeLabel: string): ReactNode {
  if (isUnit) return <Chip label={typeLabel} size="small" color="warning" />;
  if (isPie) return <Chip label={typeLabel} size="small" color="error" />;
  return typeLabel;
}
