import { MaterialColumnSchema } from '@/utils/tables-schemas/material/material-columns-schema.enum';

export const MaterialRequiredCreateColumns: string[] = [
  MaterialColumnSchema.price,
  MaterialColumnSchema.unitMeasurement,
  MaterialColumnSchema.categoryMaterial,
];
