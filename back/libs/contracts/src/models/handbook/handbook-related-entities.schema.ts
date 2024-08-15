import { z } from 'zod';
import { FieldUnitMeasurementBusinessValueSchema } from '../field-unit-measurement/field-unit-measurement-business-value.schema';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../field-of-category-material/field-of-category-material-business-value.schema';
import { MaterialBusinessValueSchema } from '../material/material-business-value.schema';
import { WorkspaceBusinessValueSchema } from '../workspace/workspace-business-value.schema';
import { ResponsiblePartnerProducerBusinessValueSchema } from '../responsible-partner-producer/responsible-partner-producer-business-value.schema';
import { UserBusinessValueSchema } from '../user/user-business-value.schema';
import { CategoryMaterialBusinessValueSchema } from '../category-material/category-material-business-value.schema';

export const HandbookRelatedEntitiesSchema = z.object({
  fieldUnitMeasurements: z.array(FieldUnitMeasurementBusinessValueSchema).nullable().optional(),
  responsibleManager: UserBusinessValueSchema,
  responsiblePartnerProducers: z.array(ResponsiblePartnerProducerBusinessValueSchema).nullable().optional(),
  workspace: WorkspaceBusinessValueSchema,
  materials: z.array(MaterialBusinessValueSchema).nullable().optional(),
  categoryMaterials: z.array(CategoryMaterialBusinessValueSchema).nullable().optional(),
  fieldsOfCategoryMaterials: z.array(FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
});
