'use client';

import { useSettingsContext } from '@/shared/settings';

import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { allMaterialsTableColumns } from 'src/utils/tables-schemas/material/material.schema';

import { MaterialsProps } from 'src/widgets/materials/material.props';

export default function Materials({ materialsInfo }: MaterialsProps) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Справочник материалов</Typography>
      <div style={{ width: '100%', maxWidth: '100vw' }}>
        <DataGrid
          rows={materialsInfo}
          columns={allMaterialsTableColumns}
          getRowId={(row) => row.uuid}
          autoHeight

          // checkboxSelection
        />
      </div>
    </Container>
  );
}
