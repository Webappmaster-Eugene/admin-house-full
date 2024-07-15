import { z } from 'zod';
import { MaterialGetCommand } from '@numart/house-admin-contracts';

export const MaterialTableEntity = MaterialGetCommand.ResponseEntitySchema.pick({
  uuid: true,
  name: true,
  namePublic: true,
  comment: true,
  price: true,
  sourceInfo: true,
  responsiblePartner: true,
  categoryMaterial: true,
  unitMeasurement: true,
  priceChanges: true,
  characteristicsMaterial: true,
  updatedAt: true,
}).merge(
  z.object({
    isNew: z.boolean(),
  })
);

export type TMaterialTableEntity = z.infer<typeof MaterialTableEntity>;
