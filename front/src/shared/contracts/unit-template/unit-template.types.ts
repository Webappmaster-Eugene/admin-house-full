import type { EEstimateItemType } from '../estimate/estimate.types';

export interface UnitTemplateBusinessValue {
  uuid: string;
  name: string;
  description: string | null;
  unitMeasurement: string;
  unitCost: number;
  defaultMarkupPercent: number;
  unitClientPrice: number;
  handbookUuid: string;
  lastChangeByUserUuid: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UnitTemplateComponentBusinessValue {
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
  createdAt: string;
  updatedAt: string;
}

export interface UnitTemplateWithComponents extends UnitTemplateBusinessValue {
  components: UnitTemplateComponentBusinessValue[];
}

export namespace UnitTemplateGetAllCommand {
  export type ResponseEntity = UnitTemplateWithComponents[];
}

export namespace UnitTemplateGetCommand {
  export type ResponseEntity = UnitTemplateWithComponents;
}

export namespace UnitTemplateCreateCommand {
  export interface Request {
    name: string;
    description?: string;
    unitMeasurement: string;
    defaultMarkupPercent?: number;
  }
  export type ResponseEntity = UnitTemplateBusinessValue;
}

export namespace UnitTemplateUpdateCommand {
  export interface Request {
    name?: string;
    description?: string;
    unitMeasurement?: string;
    defaultMarkupPercent?: number;
  }
  export type ResponseEntity = UnitTemplateBusinessValue;
}

export namespace UnitTemplateDeleteCommand {
  export type ResponseEntity = UnitTemplateBusinessValue;
}

export namespace UnitTemplateComponentCreateCommand {
  export interface Request {
    orderIndex: number;
    itemType: EEstimateItemType;
    materialUuid?: string | null;
    name: string;
    unitMeasurement: string;
    quantityPerUnit: number;
    unitCost: number;
    comment?: string | null;
  }
  export type ResponseEntity = UnitTemplateComponentBusinessValue;
}

export namespace UnitTemplateComponentUpdateCommand {
  export interface Request {
    orderIndex?: number;
    itemType?: EEstimateItemType;
    materialUuid?: string | null;
    name?: string;
    unitMeasurement?: string;
    quantityPerUnit?: number;
    unitCost?: number;
    comment?: string | null;
  }
  export type ResponseEntity = UnitTemplateComponentBusinessValue;
}

export namespace UnitTemplateComponentDeleteCommand {
  export type ResponseEntity = UnitTemplateComponentBusinessValue;
}
