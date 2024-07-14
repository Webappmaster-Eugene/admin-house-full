import { ProjectCreateRequestDto } from '../dto/controller/create-project.dto';
import { ProjectUpdateRequestDto } from '../dto/controller/update-project.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { CountData } from '../../../common/types/main/count.data';
import { ProjectEntity } from '../entities/project.entity';

export interface IProjectRepository extends IRepositoryCommon<ProjectCreateRequestDto, ProjectUpdateRequestDto, ProjectEntity> {
  getById: (projectId: EntityUrlParamCommand.RequestUuidParam) => Promise<ProjectEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: (skip: number, take: number) => Promise<ProjectEntity[]>;
  getAllInWorkspace: (workspaceId: EntityUrlParamCommand.RequestUuidParam, skip: number, take: number) => Promise<ProjectEntity[]>;
  getAllInOrganization: (organizationId: EntityUrlParamCommand.RequestUuidParam, skip: number, take: number) => Promise<ProjectEntity[]>;
  create: (
    dto: ProjectCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<ProjectEntity>;
  updateById: (projectId: EntityUrlParamCommand.RequestUuidParam, dto: ProjectUpdateRequestDto) => Promise<ProjectEntity>;
  deleteById: (projectId: EntityUrlParamCommand.RequestUuidParam) => Promise<ProjectEntity>;
}
