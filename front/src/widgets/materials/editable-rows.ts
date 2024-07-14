import { MaterialColumnEditableFullSchema } from 'src/utils/tables-schemas/material/material-columns-schema.enum';

export const MaterialEditableColumns = [
  MaterialColumnEditableFullSchema.namePublic,
  MaterialColumnEditableFullSchema.comment,
  MaterialColumnEditableFullSchema.price,
  MaterialColumnEditableFullSchema.sourceInfo,
  MaterialColumnEditableFullSchema.responsiblePartner,
  MaterialColumnEditableFullSchema.responsiblePartnerUuid,
];

export const MaterialEditableCreateColumns = [
  MaterialColumnEditableFullSchema.name,
  MaterialColumnEditableFullSchema.namePublic,
  MaterialColumnEditableFullSchema.comment,
  MaterialColumnEditableFullSchema.price,
  MaterialColumnEditableFullSchema.sourceInfo,
  MaterialColumnEditableFullSchema.responsiblePartner,
  MaterialColumnEditableFullSchema.responsiblePartnerUuid,
  MaterialColumnEditableFullSchema.categoryMaterial,
  MaterialColumnEditableFullSchema.categoryMaterialUuid,
  MaterialColumnEditableFullSchema.unitMeasurement,
  MaterialColumnEditableFullSchema.unitMeasurementUuid,
];
