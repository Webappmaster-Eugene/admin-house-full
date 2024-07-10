import { StatusResourceCreateRequestDto } from '../dto/controller/create-status-resource.dto';
import { StatusResourceUpdateRequestDto } from '../dto/controller/update-status-resource.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { StatusResourceEntity } from '../entities/status-resource.entity';

export interface IStatusResourceRepository
  extends IRepositoryCommon<StatusResourceCreateRequestDto, StatusResourceUpdateRequestDto, StatusResourceEntity> {
  getById: (statusResourceId: EntityUrlParamCommand.RequestUuidParam) => Promise<StatusResourceEntity>;
  getAll: (skip?: number, take?: number) => Promise<StatusResourceEntity[]>;
  create: (dto: StatusResourceCreateRequestDto) => Promise<StatusResourceEntity>;
  updateById: (
    statusResourceId: EntityUrlParamCommand.RequestUuidParam,
    dto: StatusResourceUpdateRequestDto,
  ) => Promise<StatusResourceEntity>;
  deleteById: (statusResourceId: EntityUrlParamCommand.RequestUuidParam) => Promise<StatusResourceEntity>;
}
