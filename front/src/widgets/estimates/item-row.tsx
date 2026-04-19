import { useState } from 'react';

import { IconButton, Stack, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { EstimateItemBusinessValue } from 'src/shared/contracts/estimate';

import { ITEM_TYPE_OPTIONS, formatMoney } from './_consts';
import { renderTypeLabel } from './_helpers';
import { ComponentRow } from './component-row';
import { PieLayerRow } from './pie-layer-row';

interface ItemRowProps {
  item: EstimateItemBusinessValue;
  num: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function ItemRow({ item, num, onEdit, onDelete }: ItemRowProps) {
  const [expanded, setExpanded] = useState(false);
  const typeLabel = ITEM_TYPE_OPTIONS.find((o) => o.value === item.itemType)?.label ?? item.itemType;
  const isUnit = item.itemType === 'UNIT';
  const isPie = item.itemType === 'PIE';
  const hasBreakdown = (item.components?.length ?? 0) > 0 || (item.pieLayers?.length ?? 0) > 0;

  return (
    <>
      <TableRow hover>
        <TableCell>
          {hasBreakdown && (
            <IconButton size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>{num}</TableCell>
        <TableCell>{renderTypeLabel(isUnit, isPie, typeLabel)}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell align="right">{item.quantity}</TableCell>
        <TableCell>{item.unitMeasurement}</TableCell>
        <TableCell align="right">{formatMoney(item.unitCost)}</TableCell>
        <TableCell align="right">{formatMoney(item.totalCost)}</TableCell>
        <TableCell align="right">{item.markupPercent}%</TableCell>
        <TableCell align="right">
          <strong>{formatMoney(item.totalClientPrice)}</strong>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <IconButton
              size="small"
              onClick={onEdit}
              title="Редактировать строку"
              color="primary"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onDelete} title="Удалить строку" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      {expanded &&
        (item.components ?? []).map((component, idx) => (
          <ComponentRow key={component.uuid} component={component} num={`${num}.${idx + 1}`} />
        ))}

      {expanded &&
        (item.pieLayers ?? []).map((layer, idx) => (
          <PieLayerRow key={layer.uuid} layer={layer} num={`${num}.${idx + 1}`} />
        ))}
    </>
  );
}
