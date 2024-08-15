import { MaterialColumnEditableFullSchema } from 'src/utils/tables-schemas/material/material-columns-schema.enum';

export const MaterialEditableColumns: string[] = [
  MaterialColumnEditableFullSchema.namePublic,
  MaterialColumnEditableFullSchema.comment,
  MaterialColumnEditableFullSchema.price,
  MaterialColumnEditableFullSchema.sourceInfo,
  MaterialColumnEditableFullSchema.responsiblePartner,
];

export const MaterialEditableCreateColumns: string[] = [
  MaterialColumnEditableFullSchema.name,
  MaterialColumnEditableFullSchema.namePublic,
  MaterialColumnEditableFullSchema.comment,
  MaterialColumnEditableFullSchema.price,
  MaterialColumnEditableFullSchema.sourceInfo,
  MaterialColumnEditableFullSchema.responsiblePartner,
  MaterialColumnEditableFullSchema.categoryMaterial,
  MaterialColumnEditableFullSchema.unitMeasurement,
];
