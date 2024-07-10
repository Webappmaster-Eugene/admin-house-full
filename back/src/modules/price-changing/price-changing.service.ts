import { Inject, Injectable } from '@nestjs/common';
import { PriceChangingEntity } from './entities/price-changing.entity';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IPriceChangingRepository } from './types/price-changing.repository.interface';
import { PriceChangingUpdateRequestDto } from './dto/controller/update-price-changing.dto';
import { IPriceChangingService } from './types/price-changing.service.interface';
import { PriceChangingCreateRequestDto } from './dto/controller/create-price-changing.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class PriceChangingService implements IPriceChangingService {
  constructor(
    @Inject(KFI.PRICE_CHANGING_REPOSITORY)
    private readonly priceChangingRepository: IPriceChangingRepository,
  ) {}

  async getById(priceChangingId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<PriceChangingEntity>> {
    const findedPriceChanging = await this.priceChangingRepository.getById(priceChangingId);
    return new InternalResponse<PriceChangingEntity>(findedPriceChanging);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<PriceChangingEntity[]>> {
    const { skip, take } = queryParams;
    const allPriceChangings = await this.priceChangingRepository.getAll(skip, take);
    return new InternalResponse(allPriceChangings);
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<PriceChangingEntity[]>> {
    const { skip, take } = queryParams;
    const allPriceChangings = await this.priceChangingRepository.getAllInHandbook(handbookId, skip, take);
    return new InternalResponse(allPriceChangings);
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<PriceChangingEntity[]>> {
    const { skip, take } = queryParams;
    const allPriceChangings = await this.priceChangingRepository.getAllInCategoryMaterial(categoryMaterialId, skip, take);
    return new InternalResponse(allPriceChangings);
  }

  async getAllInMaterial(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<PriceChangingEntity[]>> {
    const { skip, take } = queryParams;
    const allPriceChangings = await this.priceChangingRepository.getAllInMaterial(materialId, skip, take);
    return new InternalResponse(allPriceChangings);
  }

  async create(
    dto: PriceChangingCreateRequestDto,
    changedById: EntityUrlParamCommand.RequestUuidParam,
    materialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<PriceChangingEntity>> {
    const createdPriceChanging = await this.priceChangingRepository.create(dto, changedById, materialId);
    return new InternalResponse(createdPriceChanging);
  }

  async updateById(
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    dto: PriceChangingUpdateRequestDto,
  ): Promise<UniversalInternalResponse<PriceChangingEntity>> {
    const updatedPriceChanging = await this.priceChangingRepository.updateById(priceChangingId, dto);
    return new InternalResponse(updatedPriceChanging);
  }

  async deleteById(priceChangingId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<PriceChangingEntity>> {
    const deletedPriceChanging = await this.priceChangingRepository.deleteById(priceChangingId);
    return new InternalResponse(deletedPriceChanging);
  }
}
