import { z } from 'zod';
import { ResponsiblePartnerProducerBusinessValueSchema } from '../responsible-partner-producer/responsible-partner-producer-business-value.schema';
import { FieldUnitMeasurementBusinessValueSchema } from '../field-unit-measurement/field-unit-measurement-business-value.schema';
import { HandbookBusinessValueSchema } from '../handbook/handbook-business-value.schema';
import { CategoryMaterialBusinessValueSchema } from '../category-material/category-material-business-value.schema';
import { CharacteristicsMaterialBusinessValueSchema } from '../characteristics-material/characteristics-material-business-value.schema';
import { PriceChangingBusinessValueSchema } from '../price-changing/price-changing-business-value.schema';

export const MaterialRelatedEntitiesSchema = z.object({
  responsiblePartner: ResponsiblePartnerProducerBusinessValueSchema,
  unitMeasurement: FieldUnitMeasurementBusinessValueSchema.nullable().optional(),
  handbook: HandbookBusinessValueSchema,
  categoryMaterial: CategoryMaterialBusinessValueSchema,
  characteristicsMaterial: z.array(CharacteristicsMaterialBusinessValueSchema).nullable().optional(),
  priceChanges: z.array(PriceChangingBusinessValueSchema).nullable().optional(),
});
