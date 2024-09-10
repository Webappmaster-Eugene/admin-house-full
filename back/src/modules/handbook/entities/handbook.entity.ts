import {
  CategoryMaterial,
  EActiveStatuses,
  FieldOfCategoryMaterial,
  FieldUnitMeasurement,
  Handbook,
  Material,
  Organization,
  ResponsiblePartnerProducer,
  User,
  Workspace,
} from '.prisma/client';

export interface HandbookRelatedEntities {
  categoryMaterials: CategoryMaterial[];
  fieldUnitMeasurements: FieldUnitMeasurement[];
  responsibleManager: User;
  responsiblePartnerProducers: ResponsiblePartnerProducer[];
  workspace: Workspace & {
    workspaceMembers: User[];
    organizations: Organization[];
  };
  materials: Material[];
  fieldsOfCategoryMaterials: FieldOfCategoryMaterial[];
}

export class HandbookEntity implements Handbook, HandbookRelatedEntities {
  uuid: string;
  description: string;
  name: string;
  handbookStatus: EActiveStatuses;
  canCustomerView: boolean;
  responsibleManagerUuid: string;
  workspaceUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  categoryMaterials: CategoryMaterial[];
  fieldUnitMeasurements: FieldUnitMeasurement[];
  responsibleManager: User;
  responsiblePartnerProducers: ResponsiblePartnerProducer[];
  workspace: Workspace & {
    workspaceMembers: User[];
    organizations: Organization[];
  };
  materials: Material[];
  fieldsOfCategoryMaterials: FieldOfCategoryMaterial[];

  constructor(handbook: Partial<Handbook>) {
    Object.assign(this, handbook);
    return this;
  }
}
