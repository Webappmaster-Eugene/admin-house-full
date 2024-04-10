import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { ProjectCreateRequestDto } from '../dto/controller/create-project.dto';
import { ProjectUpdateRequestDto } from '../dto/controller/update-project.dto';
import { EUserTypeVariants } from '@prisma/client';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { ProjectEntity } from '../entities/project.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IProjectService
  extends IServiceCommon<
    ProjectCreateRequestDto,
    ProjectUpdateRequestDto,
    ProjectEntity
  > {
  getById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<ProjectEntity | null>>;
  create: (
    dto: ProjectCreateRequestDto,
    userInfo: IJWTPayload,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<ProjectEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: ProjectUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<ProjectEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<ProjectEntity>>;
}
