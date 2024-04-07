import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { ProjectCreateRequestDto } from '../dto/controller/create-project.dto';
import { ProjectUpdateRequestDto } from '../dto/controller/update-project.dto';
import { EUserTypeVariants } from '@prisma/client';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { ProjectEntity } from '../entities/project.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IProjectService
  extends IServiceCommon<
    ProjectCreateRequestDto,
    ProjectUpdateRequestDto,
    ProjectEntity,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalInternalResponse<ProjectEntity | null>>;
  getByValue: (
    value: EUserTypeVariants,
  ) => Promise<UniversalInternalResponse<ProjectEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<ProjectEntity[] | null>>;
  create: (
    dto: ProjectCreateRequestDto,
  ) => Promise<UniversalInternalResponse<ProjectEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: ProjectUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<ProjectEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalInternalResponse<ProjectEntity>>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
