import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack, Button, IconButton, Typography } from '@mui/material';

import { EstimateItemBusinessValue } from 'src/shared/contracts/estimate';

import { renderTypeLabel } from './_helpers';
import { formatMoney, ITEM_TYPE_OPTIONS } from './_consts';

interface ItemCardProps {
  item: EstimateItemBusinessValue;
  num: string;
  onEdit: () => void;
  onDelete: () => void;
}

interface BreakdownLine {
  uuid: string;
  num: string;
  name: string;
  quantity: number;
  unitMeasurement: string;
  unitCost: number;
  totalCost: number;
}

/**
 * Строка сметы на узком экране. Таблица из 11 колонок на телефоне не помещается,
 * поэтому те же данные — карточкой: расчёт «кол-во × цена = стоимость», наценка и цена
 * для заказчика, состав единички или пирога раскрывается под строкой.
 */
export function ItemCard({ item, num, onEdit, onDelete }: ItemCardProps) {
  const [expanded, setExpanded] = useState(false);
  const typeLabel =
    ITEM_TYPE_OPTIONS.find((o) => o.value === item.itemType)?.label ?? item.itemType;
  const isUnit = item.itemType === 'UNIT';
  const isPie = item.itemType === 'PIE';

  const breakdown: BreakdownLine[] = [
    ...(item.components ?? []).map((component, idx) => ({
      uuid: component.uuid,
      num: `${num}.${idx + 1}`,
      name: component.name,
      quantity: component.quantityPerUnit,
      unitMeasurement: component.unitMeasurement,
      unitCost: component.unitCost,
      totalCost: component.totalCost,
    })),
    ...(item.pieLayers ?? []).map((layer, idx) => ({
      uuid: layer.uuid,
      num: `${num}.${idx + 1}`,
      name: layer.thickness > 0 ? `${layer.name} [${layer.thickness} мм]` : layer.name,
      quantity: layer.consumptionPerM2,
      unitMeasurement: layer.unitMeasurement,
      unitCost: layer.unitCost,
      totalCost: layer.totalCost,
    })),
  ];

  return (
    <Box sx={{ py: 1.5 }}>
      <Stack direction="row" spacing={1} alignItems="flex-start">
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Typography variant="caption" color="text.secondary">
              {num}
            </Typography>
            {/* div, а не Typography: renderTypeLabel может вернуть Chip, а он — блочный элемент */}
            <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
              {renderTypeLabel(isUnit, isPie, typeLabel)}
            </Box>
          </Stack>
          <Typography variant="subtitle2" sx={{ mt: 0.5, wordBreak: 'break-word' }}>
            {item.name}
          </Typography>
        </Box>
        <Stack direction="row" sx={{ flexShrink: 0, mr: -1 }}>
          <IconButton
            size="small"
            onClick={onEdit}
            color="primary"
            aria-label={`Редактировать строку ${num}`}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={onDelete}
            color="error"
            aria-label={`Удалить строку ${num}`}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
        {`${item.quantity} ${item.unitMeasurement} × ${formatMoney(item.unitCost)} = `}
        <Box component="span" sx={{ color: 'text.primary', whiteSpace: 'nowrap' }}>
          {formatMoney(item.totalCost)}
        </Box>
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.25 }}>
        <Box component="span" sx={{ color: 'text.secondary' }}>
          {`Наценка ${item.markupPercent}% → для заказчика `}
        </Box>
        <Box component="strong" sx={{ whiteSpace: 'nowrap' }}>
          {formatMoney(item.totalClientPrice)}
        </Box>
      </Typography>

      {breakdown.length > 0 && (
        <>
          <Button
            size="small"
            color="inherit"
            onClick={() => setExpanded((prev) => !prev)}
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ mt: 0.5, ml: -1, color: 'text.secondary' }}
          >
            {`${isPie ? 'Слои' : 'Состав'} (${breakdown.length})`}
          </Button>
          {expanded && (
            <Stack spacing={1} sx={{ mt: 0.5, pl: 1.5, borderLeft: 2, borderColor: 'divider' }}>
              {breakdown.map((line) => (
                <Box key={line.uuid}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', wordBreak: 'break-word' }}>
                    {`${line.num} ${line.name}`}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {/* quantity — расход на 1 ед. строки, totalCost — на всё её количество:
                        «0,2 м³ × 900 ₽ = 19 800 ₽» было бы неверной формулой */}
                    {`${line.quantity} ${line.unitMeasurement} на 1 ${item.unitMeasurement} · ${formatMoney(line.unitCost)} за ${line.unitMeasurement} · итого ${formatMoney(line.totalCost)}`}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </>
      )}
    </Box>
  );
}
