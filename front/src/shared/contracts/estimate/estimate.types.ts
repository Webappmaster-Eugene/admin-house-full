// Локальные типы контрактов сметы (синхронизированы с first/back/libs/contracts/src/commands/estimate/).
// Пакет @numart/house-admin-contracts не обновляем — всё локально.

export type EEstimateItemType = 'MATERIAL' | 'MECHANISM' | 'WORK' | 'OVERHEAD';

export type EstimateActiveStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

export interface EstimateBusinessValue {
  uuid: string;
  name: string;
  description: string | null;
  estimateStatus: EstimateActiveStatus | null;
  defaultMarkupPercent: number;
  totalCost: number;
  totalClientPrice: number;
  projectUuid: string;
  lastChangeByUserUuid: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EstimateItemBusinessValue {
  uuid: string;
  orderIndex: number;
  itemType: EEstimateItemType;
  sectionUuid: string;
  materialUuid: string | null;
  name: string;
  unitMeasurement: string;
  quantity: number;
  unitCost: number;
  markupPercent: number;
  unitClientPrice: number;
  totalCost: number;
  totalClientPrice: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EstimateSectionBusinessValue {
  uuid: string;
  name: string;
  orderIndex: number;
  estimateUuid: string;
  parentSectionUuid: string | null;
  sectionTotalCost: number;
  sectionTotalClientPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface EstimateSectionTree extends EstimateSectionBusinessValue {
  items: EstimateItemBusinessValue[];
  childSections: EstimateSectionTree[];
}

export interface EstimateFull extends EstimateBusinessValue {
  sections: EstimateSectionTree[];
}

// ---- Commands ----

export namespace EstimateGetAllCommand {
  export type ResponseEntity = EstimateBusinessValue[];
}

export namespace EstimateGetCommand {
  export type ResponseEntity = EstimateFull;
}

export namespace EstimateCreateCommand {
  export interface Request {
    name: string;
    description?: string;
    defaultMarkupPercent?: number;
  }
  export type ResponseEntity = EstimateBusinessValue;
}

export namespace EstimateUpdateCommand {
  export interface Request {
    name?: string;
    description?: string;
    defaultMarkupPercent?: number;
    estimateStatus?: EstimateActiveStatus;
  }
  export type ResponseEntity = EstimateBusinessValue;
}

export namespace EstimateDeleteCommand {
  export type ResponseEntity = EstimateBusinessValue;
}

export namespace EstimateSectionCreateCommand {
  export interface Request {
    name: string;
    orderIndex: number;
    parentSectionUuid?: string | null;
  }
  export type ResponseEntity = EstimateSectionBusinessValue;
}

export namespace EstimateSectionUpdateCommand {
  export interface Request {
    name?: string;
    orderIndex?: number;
    parentSectionUuid?: string | null;
  }
  export type ResponseEntity = EstimateSectionBusinessValue;
}

export namespace EstimateSectionDeleteCommand {
  export type ResponseEntity = EstimateSectionBusinessValue;
}

export namespace EstimateItemCreateCommand {
  export interface Request {
    orderIndex: number;
    itemType: EEstimateItemType;
    materialUuid?: string | null;
    name: string;
    unitMeasurement: string;
    quantity: number;
    unitCost: number;
    markupPercent?: number;
    comment?: string | null;
  }
  export type ResponseEntity = EstimateItemBusinessValue;
}

export namespace EstimateItemUpdateCommand {
  export interface Request {
    orderIndex?: number;
    itemType?: EEstimateItemType;
    materialUuid?: string | null;
    name?: string;
    unitMeasurement?: string;
    quantity?: number;
    unitCost?: number;
    markupPercent?: number;
    comment?: string | null;
  }
  export type ResponseEntity = EstimateItemBusinessValue;
}

export namespace EstimateItemDeleteCommand {
  export type ResponseEntity = EstimateItemBusinessValue;
}
