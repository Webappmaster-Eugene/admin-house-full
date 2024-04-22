import { Inject, Injectable } from '@nestjs/common';
import { PriceChangingEntity } from './entities/price-changing.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IPriceChangingRepository } from './types/price-changing.repository.interface';
import { PriceChangingUpdateRequestDto } from './dto/controller/update-price-changing.dto';
import { IPriceChangingService } from './types/price-changing.service.interface';
import { PriceChangingCreateRequestDto } from './dto/controller/create-price-changing.dto';

@Injectable()
export class PriceChangingService implements IPriceChangingService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_HANDBOOK_REPOSITORY)
    private readonly price-changingRepository: IPriceChangingRepository,
  ) {}

  async getById(
    price-changingId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<PriceChangingEntity>> {
    const findedPriceChanging =
      await this.price-changingRepository.getById(price-changingId);
    return new InternalResponse<PriceChangingEntity>(findedPriceChanging);
  }

  async getByManagerId(
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<PriceChangingEntity>> {
    const findedPriceChanging =
      await this.price-changingRepository.getByManagerId(managerId);
    return new InternalResponse<PriceChangingEntity>(findedPriceChanging);
  }

  async getAll(): Promise<UniversalInternalResponse<PriceChangingEntity[]>> {
    const allPriceChangings = await this.price-changingRepository.getAll();
    return new InternalResponse<PriceChangingEntity[]>(allPriceChangings);
  }

  // для создания PriceChanging нужно указать id пользователя (менеджера), для которого создается PriceChanging
  async create(
    dto: PriceChangingCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<PriceChangingEntity>> {
    const createdPriceChanging = await this.price-changingRepository.create(
      dto,
      managerId,
    );
    return new InternalResponse<PriceChangingEntity>(createdPriceChanging);
  }

  async updateById(
    price-changingId: EntityUrlParamCommand.RequestUuidParam,
    dto: PriceChangingUpdateRequestDto,
  ): Promise<UniversalInternalResponse<PriceChangingEntity>> {
    const updatedPriceChanging = await this.price-changingRepository.updateById(
      price-changingId,
      dto,
    );
    return new InternalResponse<PriceChangingEntity>(updatedPriceChanging);
  }

  async deleteById(
    price-changingId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<PriceChangingEntity>> {
    const deletedPriceChanging =
      await this.price-changingRepository.deleteById(price-changingId);
    return new InternalResponse<PriceChangingEntity>(deletedPriceChanging);
  }
}
