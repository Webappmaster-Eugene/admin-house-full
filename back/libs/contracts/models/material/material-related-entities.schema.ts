import { z } from 'zod';
import { ResponsiblePartnerProducerSchema } from '../responsible-partner-producer';
import { PriceChangingSchema } from '../price-changing';
import { CharacteristicsMaterialSchema } from '../characteristics-material';
import { CategoryMaterialSchema } from '../category-material';
import { HandbookSchema } from '../handbook';
import { FieldUnitMeasurementSchema } from '../field-unit-measurement';

export const MaterialRelatedEntitiesSchema = z.object({
  responsiblePartner: ResponsiblePartnerProducerSchema,
  unitMeasurement: FieldUnitMeasurementSchema,
  handbook: HandbookSchema,
  categoryMaterial: CategoryMaterialSchema,
  characteristicsMaterial: z.array(CharacteristicsMaterialSchema),
  priceChanges: z.array(PriceChangingSchema),
});
