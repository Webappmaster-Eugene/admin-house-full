import { ProjectCreateRequestDto } from '../dto/controller/create-project.dto';
import { ProjectUpdateRequestDto } from '../dto/controller/update-project.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { ProjectEntity } from '../entities/project.entity';

export interface IProjectRepository
  extends IRepositoryCommon<
    ProjectCreateRequestDto,
    ProjectUpdateRequestDto,
    ProjectEntity
  > {
  getById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<ProjectEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<ProjectEntity[]>;
  create: (
    dto: ProjectCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<ProjectEntity>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: ProjectUpdateRequestDto,
  ) => Promise<ProjectEntity>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<ProjectEntity>;
}