import { z } from 'zod';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../field-of-category-material';
import { CategoryMaterialBusinessValueSchema } from '../category-material';
import { FieldUnitMeasurementBusinessValueSchema } from '../field-unit-measurement';
import { UserBusinessValueSchema } from '../user';
import { MaterialBusinessValueSchema } from '../material';
import { ResponsiblePartnerProducerBusinessValueSchema } from '../responsible-partner-producer';
import { WorkspaceBusinessValueSchema } from '../workspace';

export const HandbookRelatedEntitiesSchema = z.object({
  categoryMaterials: z.array(CategoryMaterialBusinessValueSchema).nullable().optional(),
  fieldUnitMeasurements: z.array(FieldUnitMeasurementBusinessValueSchema).nullable().optional(),
  responsibleManager: UserBusinessValueSchema,
  responsiblePartnerProducers: z.array(ResponsiblePartnerProducerBusinessValueSchema).nullable().optional(),
  workspace: WorkspaceBusinessValueSchema,
  //   .merge(
  //   z.object({
  //     workspaceMembers: z.array(UserBusinessValueSchema).nullable().optional(),
  //     organizations: z.array(OrganizationBusinessValueSchema).nullable().optional(),
  //   }),
  // ),
  materials: z.array(MaterialBusinessValueSchema).nullable().optional(),
  fieldsOfCategoryMaterials: z.array(FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
});
