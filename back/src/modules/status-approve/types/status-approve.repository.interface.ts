import { StatusApproveCreateRequestDto } from '../../../modules/status-approve/dto/controller/create-status-approve.dto';
import { StatusApproveUpdateRequestDto } from '../../../modules/status-approve/dto/controller/update-status-approve.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { StatusApproveEntity } from '../../../modules/status-approve/entities/status-approve.entity';

export interface IStatusApproveRepository
  extends IRepositoryCommon<StatusApproveCreateRequestDto, StatusApproveUpdateRequestDto, StatusApproveEntity> {
  getById: (statusApproveId: EntityUrlParamCommand.RequestUuidParam) => Promise<StatusApproveEntity>;
  getAll: (skip?: number, take?: number) => Promise<StatusApproveEntity[]>;
  create: (dto: StatusApproveCreateRequestDto) => Promise<StatusApproveEntity>;
  updateById: (statusApproveId: EntityUrlParamCommand.RequestUuidParam, dto: StatusApproveUpdateRequestDto) => Promise<StatusApproveEntity>;
  deleteById: (statusApproveId: EntityUrlParamCommand.RequestUuidParam) => Promise<StatusApproveEntity>;
}
