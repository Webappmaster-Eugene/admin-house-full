import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { WorkspaceCreateRequestDto } from '../dto/controller/create-workspace.dto';
import { WorkspaceUpdateRequestDto } from '../dto/controller/update-workspace.dto';
import { EUserTypeVariants } from '@prisma/client';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { WorkspaceEntity } from '../entities/workspace.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IWorkspaceService
  extends IServiceCommon<
    WorkspaceCreateRequestDto,
    WorkspaceUpdateRequestDto,
    WorkspaceEntity,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity | null>>;
  getByValue: (
    value: EUserTypeVariants,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<WorkspaceEntity[] | null>>;
  create: (
    dto: WorkspaceCreateRequestDto,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: WorkspaceUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
