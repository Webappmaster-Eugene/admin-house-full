import { OrganizationCreateRequestDto } from '../dto/controller/create-organization.dto';
import { OrganizationUpdateRequestDto } from '../dto/controller/update-organization.dto';
import { EUserTypeVariants } from '@prisma/client';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { OrganizationEntity } from '../entities/organization.entity';

export interface IOrganizationRepository
  extends IRepositoryCommon<
    OrganizationCreateRequestDto,
    OrganizationUpdateRequestDto,
    OrganizationEntity,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<OrganizationEntity>;
  getByValue: (value: EUserTypeVariants) => Promise<OrganizationEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<OrganizationEntity[]>;
  create: (dto: OrganizationCreateRequestDto) => Promise<OrganizationEntity>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: OrganizationUpdateRequestDto,
  ) => Promise<OrganizationEntity>;
  deleteById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<OrganizationEntity>;
}
