import { Inject, Injectable } from '@nestjs/common';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { CharacteristicsMaterialEntity } from './entities/characteristics-material.entity';
import { ICharacteristicsMaterialRepository } from './types/characteristics-material.repository.interface';
import { ICharacteristicsMaterialService } from './types/characteristics-material.service.interface';
import { CharacteristicsMaterialUpdateRequestDto } from './dto/controller/update-characteristics-material.dto';
import { CharacteristicsMaterialCreateRequestDto } from './dto/controller/create-characteristics-material.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class CharacteristicsMaterialService implements ICharacteristicsMaterialService {
  constructor(
    @Inject(KFI.CHARACTERISTICS_MATERIAL_REPOSITORY)
    private readonly characteristicsMaterialRepository: ICharacteristicsMaterialRepository,
  ) {}

  async getById(
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>> {
    const findedCharacteristicsMaterial = await this.characteristicsMaterialRepository.getById(characteristicsMaterialId);
    return new InternalResponse(findedCharacteristicsMaterial);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allCharacteristicsMaterials = await this.characteristicsMaterialRepository.getAll(skip, take);
    return new InternalResponse(allCharacteristicsMaterials);
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allCharacteristicsMaterials = await this.characteristicsMaterialRepository.getAllInHandbook(handbookId, skip, take);
    return new InternalResponse(allCharacteristicsMaterials);
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allCharacteristicsMaterials = await this.characteristicsMaterialRepository.getAllInCategoryMaterial(
      categoryMaterialId,
      skip,
      take,
    );
    return new InternalResponse(allCharacteristicsMaterials);
  }

  async getAllInMaterial(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allCharacteristicsMaterials = await this.characteristicsMaterialRepository.getAllInMaterial(materialId, skip, take);
    return new InternalResponse(allCharacteristicsMaterials);
  }

  async create(
    dto: CharacteristicsMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>> {
    const createdCharacteristicsMaterial = await this.characteristicsMaterialRepository.create(
      dto,
      handbookId,
      categoryMaterialId,
      materialId,
      userId,
    );
    return new InternalResponse(createdCharacteristicsMaterial);
  }

  async updateById(
    characteristicsMaterialIdId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>> {
    const updatedCharacteristicsMaterial = await this.characteristicsMaterialRepository.updateById(characteristicsMaterialIdId, dto);
    return new InternalResponse(updatedCharacteristicsMaterial);
  }

  async deleteById(
    characteristicsMaterialIdId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>> {
    const deletedCharacteristicsMaterial = await this.characteristicsMaterialRepository.deleteById(characteristicsMaterialIdId);
    return new InternalResponse(deletedCharacteristicsMaterial);
  }
}