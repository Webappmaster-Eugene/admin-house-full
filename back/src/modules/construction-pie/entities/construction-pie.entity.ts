import { ConstructionPie, PieLayer } from '.prisma/client';

export class ConstructionPieEntity implements ConstructionPie {
  uuid: string;
  name: string;
  description: string | null;
  unitMeasurement: string;
  totalThickness: number;
  unitCost: number;
  defaultMarkupPercent: number;
  unitClientPrice: number;
  handbookUuid: string;
  lastChangeByUserUuid: string | null;
  createdAt: Date;
  updatedAt: Date;
  layers?: PieLayerEntity[];

  constructor(data: Partial<ConstructionPie> & { layers?: PieLayerEntity[] }) {
    Object.assign(this, data);
  }
}

export class PieLayerEntity implements PieLayer {
  uuid: string;
  orderIndex: number;
  constructionPieUuid: string;
  materialUuid: string | null;
  name: string;
  thickness: number;
  density: number;
  consumptionPerM2: number;
  unitMeasurement: string;
  unitCost: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<PieLayer>) {
    Object.assign(this, data);
  }
}
