// ----------------------------------------------------------------------

import Materials from '@/widgets/materials/materials';
import { MaterialGetAllCommand } from '@numart/house-admin-contracts';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { getAllMaterials } from 'src/api/actions/material/get-all-materials.action';

export const metadata = {
  title: 'Dashboard: Materials',
};

export default async function Page() {
  let allMaterials = await getAllMaterials();
  if (!isErrorFieldTypeGuard(allMaterials)) {
    allMaterials = allMaterials as MaterialGetAllCommand.ResponseEntity;
  }
  return isErrorFieldTypeGuard(allMaterials) ? (
    <p>ooops...</p>
  ) : (
    <Materials materialsInfo={allMaterials} />
  );
}
