import { Handbook } from '.prisma/client';
import { CategoryMaterialEntity } from 'src/modules/category-material/entities/category-material.entity';
import { FieldUnitMeasurementEntity } from 'src/modules/field-unit-measurement/entities/field-unit-measurement.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ResponsiblePartnerProducerEntity } from 'src/modules/responsible-partner-producer/entities/responsible-partner-producer.entity';
import { WorkspaceEntity } from 'src/modules/workspace/entities/workspace.entity';
import { OrganizationEntity } from 'src/modules/organization/entities/organization.entity';
import { MaterialEntity } from 'src/modules/material/entities/material.entity';
import { FieldOfCategoryMaterialEntity } from 'src/modules/field-of-category-material/entities/field-of-category-material.entity';

export interface HandbookRelatedEntities {
  categoryMaterials: CategoryMaterialEntity[];
  fieldUnitMeasurements: FieldUnitMeasurementEntity[];
  responsibleManager: UserEntity;
  responsiblePartnerProducers: ResponsiblePartnerProducerEntity[];
  workspace: WorkspaceEntity & {
    workspaceMembers: UserEntity[];
    organizations: OrganizationEntity[];
  };
  materials: MaterialEntity[];
  fieldsOfCategoryMaterials: FieldOfCategoryMaterialEntity[];
}

export class HandbookEntity implements Handbook, HandbookRelatedEntities {
  uuid: string;
  description: string;
  name: string;
  canCustomerView: boolean;
  responsibleManagerUuid: string;
  workspaceUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  categoryMaterials: CategoryMaterialEntity[];
  fieldUnitMeasurements: FieldUnitMeasurementEntity[];
  responsibleManager: UserEntity;
  responsiblePartnerProducers: ResponsiblePartnerProducerEntity[];
  workspace: WorkspaceEntity & {
    workspaceMembers: UserEntity[];
    organizations: OrganizationEntity[];
  };
  materials: MaterialEntity[];
  fieldsOfCategoryMaterials: FieldOfCategoryMaterialEntity[];

  constructor(handbook: Partial<Handbook>) {
    Object.assign(this, handbook);
    return this;
  }
}
