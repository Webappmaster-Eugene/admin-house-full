import { IconButton, TableCell, TableRow } from '@mui/material';

import { EstimateItemComponentBusinessValue } from 'src/shared/contracts/estimate';

import { ITEM_TYPE_OPTIONS, formatMoney } from './_consts';

interface ComponentRowProps {
  component: EstimateItemComponentBusinessValue;
  num: string;
}

export function ComponentRow({ component, num }: ComponentRowProps) {
  const typeLabel =
    ITEM_TYPE_OPTIONS.find((o) => o.value === component.itemType)?.label ?? component.itemType;
  return (
    <TableRow sx={{ bgcolor: 'action.hover' }}>
      <TableCell />
      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary' }}>{num}</TableCell>
      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary' }}>{typeLabel}</TableCell>
      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
        ↳ {component.name}
      </TableCell>
      <TableCell align="right">{component.quantityPerUnit}</TableCell>
      <TableCell>{component.unitMeasurement}</TableCell>
      <TableCell align="right">{formatMoney(component.unitCost)}</TableCell>
      <TableCell align="right">{formatMoney(component.totalCost)}</TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  );
}
