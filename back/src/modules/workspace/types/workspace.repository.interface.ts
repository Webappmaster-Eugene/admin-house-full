import { WorkspaceCreateRequestDto } from '../dto/controller/create-workspace.dto';
import { WorkspaceUpdateRequestDto } from '../dto/controller/update-workspace.dto';
import { EUserTypeVariants } from '@prisma/client';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { WorkspaceEntity } from '../entities/workspace.entity';

export interface IWorkspaceRepository
  extends IRepositoryCommon<
    WorkspaceCreateRequestDto,
    WorkspaceUpdateRequestDto,
    WorkspaceEntity,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<WorkspaceEntity>;
  getByValue: (value: EUserTypeVariants) => Promise<WorkspaceEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<WorkspaceEntity[]>;
  create: (dto: WorkspaceCreateRequestDto) => Promise<WorkspaceEntity>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: WorkspaceUpdateRequestDto,
  ) => Promise<WorkspaceEntity>;
  deleteById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<WorkspaceEntity>;
}
