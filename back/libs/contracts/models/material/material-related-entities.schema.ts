import { z } from 'zod';
import { ResponsiblePartnerProducerBusinessValueSchema } from '../responsible-partner-producer';
import { PriceChangingBusinessValueSchema } from '../price-changing';
import { CharacteristicsMaterialBusinessValueSchema } from '../characteristics-material';
import { CategoryMaterialBusinessValueSchema } from '../category-material';
import { FieldUnitMeasurementBusinessValueSchema } from '../field-unit-measurement';
import { HandbookBusinessValueSchema } from '../handbook';

export const MaterialRelatedEntitiesSchema = z.object({
  responsiblePartner: ResponsiblePartnerProducerBusinessValueSchema.nullable().optional(),
  unitMeasurement: FieldUnitMeasurementBusinessValueSchema.nullable().optional(),
  handbook: HandbookBusinessValueSchema,
  categoryMaterial: CategoryMaterialBusinessValueSchema,
  characteristicsMaterial: z.array(CharacteristicsMaterialBusinessValueSchema).nullable().optional(),
  priceChanges: z.array(PriceChangingBusinessValueSchema).nullable().optional(),
});
