import { EEstimateItemType, UnitTemplate, UnitTemplateComponent } from '.prisma/client';

export class UnitTemplateEntity implements UnitTemplate {
  uuid: string;
  name: string;
  description: string | null;
  unitMeasurement: string;
  unitCost: number;
  defaultMarkupPercent: number;
  unitClientPrice: number;
  handbookUuid: string;
  lastChangeByUserUuid: string | null;
  createdAt: Date;
  updatedAt: Date;
  components?: UnitTemplateComponentEntity[];

  constructor(data: Partial<UnitTemplate> & { components?: UnitTemplateComponentEntity[] }) {
    Object.assign(this, data);
  }
}

export class UnitTemplateComponentEntity implements UnitTemplateComponent {
  uuid: string;
  orderIndex: number;
  itemType: EEstimateItemType;
  unitTemplateUuid: string;
  materialUuid: string | null;
  name: string;
  unitMeasurement: string;
  quantityPerUnit: number;
  unitCost: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<UnitTemplateComponent>) {
    Object.assign(this, data);
  }
}
