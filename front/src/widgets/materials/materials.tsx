'use client';

import { useSettingsContext } from '@/shared/settings';

import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';

import { allUsersTablesColumns } from 'src/utils/tables-schemas/user/all-users.schema';

import { MaterialsProps } from 'src/widgets/materials/material.props';

export default function Materials({ materialsInfo }: MaterialsProps) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* <Typography variant="h4"> Справочник </Typography> */}
      <div style={{ width: '100%', maxWidth: '100vw' }}>
        <DataGrid
          rows={materialsInfo}
          columns={allUsersTablesColumns}
          getRowId={(row) => row.uuid}
          autoHeight

          // checkboxSelection
        />
      </div>
    </Container>
  );
}
