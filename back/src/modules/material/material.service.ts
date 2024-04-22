import { Inject, Injectable } from '@nestjs/common';
import { MaterialEntity } from './entities/material.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IMaterialRepository } from './types/material.repository.interface';
import { MaterialUpdateRequestDto } from './dto/controller/update-material.dto';
import { IMaterialService } from './types/material.service.interface';
import { MaterialCreateRequestDto } from './dto/controller/create-material.dto';

@Injectable()
export class MaterialService implements IMaterialService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_HANDBOOK_REPOSITORY)
    private readonly materialRepository: IMaterialRepository,
  ) {}

  async getById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const findedMaterial = await this.materialRepository.getById(materialId);
    return new InternalResponse<MaterialEntity>(findedMaterial);
  }

  async getByManagerId(
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const findedMaterial =
      await this.materialRepository.getByManagerId(managerId);
    return new InternalResponse<MaterialEntity>(findedMaterial);
  }

  async getAll(): Promise<UniversalInternalResponse<MaterialEntity[]>> {
    const allMaterials = await this.materialRepository.getAll();
    return new InternalResponse<MaterialEntity[]>(allMaterials);
  }

  // для создания Material нужно указать id пользователя (менеджера), для которого создается Material
  async create(
    dto: MaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const createdMaterial = await this.materialRepository.create(
      dto,
      managerId,
    );
    return new InternalResponse<MaterialEntity>(createdMaterial);
  }

  async updateById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const updatedMaterial = await this.materialRepository.updateById(
      materialId,
      dto,
    );
    return new InternalResponse<MaterialEntity>(updatedMaterial);
  }

  async deleteById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const deletedMaterial =
      await this.materialRepository.deleteById(materialId);
    return new InternalResponse<MaterialEntity>(deletedMaterial);
  }
}
