import { Inject, Injectable } from '@nestjs/common';
import { MaterialEntity } from './entities/material.entity';
import { EntityUrlParamCommand } from 'libs/contracts';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IMaterialRepository } from './types/material.repository.interface';
import { MaterialUpdateRequestDto } from './dto/controller/update-material.dto';
import { IMaterialService } from './types/material.service.interface';
import { MaterialCreateRequestDto } from './dto/controller/create-material.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';
import { IPriceChangingService } from '../price-changing/types/price-changing.service.interface';
import { dataInternalExtractor } from '../../common/helpers/extractors/data-internal.extractor';

@Injectable()
export class MaterialService implements IMaterialService {
  constructor(
    @Inject(KFI.MATERIAL_REPOSITORY)
    private readonly materialRepository: IMaterialRepository,
    @Inject(KFI.PRICE_CHANGING_SERVICE)
    private readonly priceChangingService: IPriceChangingService,
  ) {}

  async getById(materialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<MaterialEntity>> {
    const findedMaterial = await this.materialRepository.getById(materialId);
    return new InternalResponse(findedMaterial);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<MaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allMaterials = await this.materialRepository.getAll(skip, take);
    return new InternalResponse(allMaterials);
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<MaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allMaterials = await this.materialRepository.getAllInHandbook(handbookId, skip, take);
    return new InternalResponse(allMaterials);
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<MaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allMaterials = await this.materialRepository.getAllInCategoryMaterial(categoryMaterialId, skip, take);
    return new InternalResponse(allMaterials);
  }

  async create(
    dto: MaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const createdMaterial = await this.materialRepository.create(dto, handbookId, categoryMaterialId);
    return new InternalResponse(createdMaterial);
  }

  async updateById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const oldMaterialData = dataInternalExtractor(await this.getById(materialId));
    const updatedMaterial = await this.materialRepository.updateById(materialId, dto);
    if (dto?.price) {
      const priceChange = await this.priceChangingService.create(
        {
          source: dto?.sourceInfo,
          oldPrice: oldMaterialData.price,
          newPrice: dto.price,
          comment: dto?.comment,
        },
        materialId,
        userId,
      );
    }
    return new InternalResponse(updatedMaterial);
  }

  async deleteById(materialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<MaterialEntity>> {
    const deletedMaterial = await this.materialRepository.deleteById(materialId);
    return new InternalResponse(deletedMaterial);
  }
}
