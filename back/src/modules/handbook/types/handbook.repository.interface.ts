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
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<HandbookEntity>;
  getByManagerId: (
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<HandbookEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<HandbookEntity[]>;
  create: (
    dto: HandbookCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<HandbookEntity>;
  updateById: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    dto: HandbookUpdateRequestDto,
  ) => Promise<HandbookEntity>;
  deleteById: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<HandbookEntity>;
}
