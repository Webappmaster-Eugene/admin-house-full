export interface ConstructionPieBusinessValue {
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
  createdAt: string;
  updatedAt: string;
}

export interface PieLayerBusinessValue {
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
  createdAt: string;
  updatedAt: string;
}

export interface ConstructionPieWithLayers extends ConstructionPieBusinessValue {
  layers: PieLayerBusinessValue[];
}

export namespace ConstructionPieGetAllCommand {
  export type ResponseEntity = ConstructionPieWithLayers[];
}

export namespace ConstructionPieGetCommand {
  export type ResponseEntity = ConstructionPieWithLayers;
}

export namespace ConstructionPieCreateCommand {
  export interface Request {
    name: string;
    description?: string;
    unitMeasurement?: string;
    defaultMarkupPercent?: number;
  }
  export type ResponseEntity = ConstructionPieBusinessValue;
}

export namespace ConstructionPieUpdateCommand {
  export interface Request {
    name?: string;
    description?: string;
    unitMeasurement?: string;
    defaultMarkupPercent?: number;
  }
  export type ResponseEntity = ConstructionPieBusinessValue;
}

export namespace ConstructionPieDeleteCommand {
  export type ResponseEntity = ConstructionPieBusinessValue;
}

export namespace PieLayerCreateCommand {
  export interface Request {
    orderIndex: number;
    materialUuid?: string | null;
    name: string;
    thickness: number;
    density?: number;
    consumptionPerM2: number;
    unitMeasurement: string;
    unitCost: number;
    comment?: string | null;
  }
  export type ResponseEntity = PieLayerBusinessValue;
}

export namespace PieLayerUpdateCommand {
  export interface Request {
    orderIndex?: number;
    materialUuid?: string | null;
    name?: string;
    thickness?: number;
    density?: number;
    consumptionPerM2?: number;
    unitMeasurement?: string;
    unitCost?: number;
    comment?: string | null;
  }
  export type ResponseEntity = PieLayerBusinessValue;
}

export namespace PieLayerDeleteCommand {
  export type ResponseEntity = PieLayerBusinessValue;
}
