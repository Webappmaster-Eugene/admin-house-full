import { ProjectCreateRequestDto } from '../dto/controller/create-project.dto';
import { ProjectUpdateRequestDto } from '../dto/controller/update-project.dto';
import { EUserTypeVariants } from '@prisma/client';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { ProjectEntity } from '../entities/project.entity';

export interface IProjectRepository
  extends IRepositoryCommon<
    ProjectCreateRequestDto,
    ProjectUpdateRequestDto,
    ProjectEntity,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<ProjectEntity>;
  getByValue: (value: EUserTypeVariants) => Promise<ProjectEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<ProjectEntity[]>;
  create: (dto: ProjectCreateRequestDto) => Promise<ProjectEntity>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: ProjectUpdateRequestDto,
  ) => Promise<ProjectEntity>;
  deleteById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<ProjectEntity>;
}
