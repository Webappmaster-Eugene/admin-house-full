import { Inject, Injectable } from '@nestjs/common';
import { MaterialEntity } from './entities/material.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IMaterialRepository } from './types/material.repository.interface';
import { MaterialUpdateRequestDto } from './dto/controller/update-material.dto';
import { IMaterialService } from './types/material.service.interface';
import { MaterialCreateRequestDto } from './dto/controller/create-material.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class MaterialService implements IMaterialService {
  constructor(
    @Inject(KFI.MATERIAL_REPOSITORY)
    private readonly materialRepository: IMaterialRepository,
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

  async create(
    dto: MaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const createdMaterial = await this.materialRepository.create(dto, managerId);
    return new InternalResponse(createdMaterial);
  }

  async updateById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const updatedMaterial = await this.materialRepository.updateById(materialId, dto);
    return new InternalResponse(updatedMaterial);
  }

  async deleteById(materialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<MaterialEntity>> {
    const deletedMaterial = await this.materialRepository.deleteById(materialId);
    return new InternalResponse(deletedMaterial);
  }
}
