import { EActiveStatuses, Estimate, EstimateSection, EstimateItem, EEstimateItemType } from '.prisma/client';

export interface EstimateSectionTreeNode extends EstimateSectionEntity {
  items: EstimateItemEntity[];
  childSections: EstimateSectionTreeNode[];
}

export class EstimateEntity implements Estimate {
  uuid: string;
  name: string;
  description: string | null;
  estimateStatus: EActiveStatuses | null;
  defaultMarkupPercent: number;
  totalCost: number;
  totalClientPrice: number;
  projectUuid: string;
  lastChangeByUserUuid: string | null;
  createdAt: Date;
  updatedAt: Date;
  sections?: EstimateSectionTreeNode[];

  constructor(data: Partial<Estimate> & { sections?: EstimateSectionTreeNode[] }) {
    Object.assign(this, data);
  }
}

export class EstimateSectionEntity implements EstimateSection {
  uuid: string;
  name: string;
  orderIndex: number;
  estimateUuid: string;
  parentSectionUuid: string | null;
  sectionTotalCost: number;
  sectionTotalClientPrice: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<EstimateSection>) {
    Object.assign(this, data);
  }
}

export class EstimateItemEntity implements EstimateItem {
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
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<EstimateItem>) {
    Object.assign(this, data);
  }
}
