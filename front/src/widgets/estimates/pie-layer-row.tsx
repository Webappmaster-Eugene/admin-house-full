import { TableCell, TableRow } from '@mui/material';

import { EstimateItemPieLayerBusinessValue } from 'src/shared/contracts/estimate';

import { formatMoney } from './_consts';

interface PieLayerRowProps {
  layer: EstimateItemPieLayerBusinessValue;
  num: string;
}

export function PieLayerRow({ layer, num }: PieLayerRowProps) {
  const thicknessLabel = layer.thickness > 0 ? ` [${layer.thickness} мм]` : '';
  return (
    <TableRow sx={{ bgcolor: 'action.hover' }}>
      <TableCell />
      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary' }}>{num}</TableCell>
      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary' }}>Слой</TableCell>
      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
        ↳ {layer.name}
        {thicknessLabel}
      </TableCell>
      <TableCell align="right">{layer.consumptionPerM2}</TableCell>
      <TableCell>{layer.unitMeasurement}</TableCell>
      <TableCell align="right">{formatMoney(layer.unitCost)}</TableCell>
      <TableCell align="right">{formatMoney(layer.totalCost)}</TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  );
}
