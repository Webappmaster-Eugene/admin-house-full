import { HandbookCreateRequestDto } from '../dto/controller/create-handbook.dto';
import { HandbookUpdateRequestDto } from '../dto/controller/update-handbook.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { HandbookEntity } from '../entities/handbook.entity';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IHandbookRepository
  extends IRepositoryCommon<
    HandbookCreateRequestDto,
    HandbookUpdateRequestDto,
    HandbookEntity
  > {
  getById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<HandbookEntity>;
  getByManagerId: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<HandbookEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<HandbookEntity[]>;
  create: (
    dto: HandbookCreateRequestDto,
    user: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<HandbookEntity>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: HandbookUpdateRequestDto,
  ) => Promise<HandbookEntity>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<HandbookEntity>;
}
