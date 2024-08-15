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
import { CategoryMaterialEntity } from 'src/modules/category-material/entities/category-material.entity';
import { FieldUnitMeasurementEntity } from 'src/modules/field-unit-measurement/entities/field-unit-measurement.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ResponsiblePartnerProducerEntity } from 'src/modules/responsible-partner-producer/entities/responsible-partner-producer.entity';
import { WorkspaceEntity } from 'src/modules/workspace/entities/workspace.entity';
import { OrganizationEntity } from 'src/modules/organization/entities/organization.entity';
import { MaterialEntity } from 'src/modules/material/entities/material.entity';
import { FieldOfCategoryMaterialEntity } from 'src/modules/field-of-category-material/entities/field-of-category-material.entity';
import { z } from 'zod';
import { FieldUnitMeasurementBusinessValueSchema } from 'libs/contracts/src/models/field-unit-measurement/field-unit-measurement-business-value.schema';
import { UserBusinessValueSchema } from 'libs/contracts/src/models/user/user-business-value.schema';
import { ResponsiblePartnerProducerBusinessValueSchema } from 'libs/contracts/src/models/responsible-partner-producer/responsible-partner-producer-business-value.schema';
import { WorkspaceBusinessValueSchema } from 'libs/contracts/src/models/workspace/workspace-business-value.schema';
import { MaterialBusinessValueSchema } from 'libs/contracts/src/models/material/material-business-value.schema';
import { CategoryMaterialBusinessValueSchema } from 'libs/contracts/src/models/category-material/category-material-business-value.schema';

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
