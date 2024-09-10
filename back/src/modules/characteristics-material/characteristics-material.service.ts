import { Inject, Injectable } from '@nestjs/common';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { CharacteristicsMaterialEntity } from './entities/characteristics-material.entity';
import { ICharacteristicsMaterialRepository } from './types/characteristics-material.repository.interface';
import { ICharacteristicsMaterialService } from './types/characteristics-material.service.interface';
import { CharacteristicsMaterialUpdateRequestDto } from './dto/controller/update-characteristics-material.dto';
import { CharacteristicsMaterialCreateRequestDto } from './dto/controller/create-characteristics-material.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';
import { IFieldOfCategoryMaterialService } from '../../modules/field-of-category-material/types/field-of-category-material.service.interface';
import { dataInternalExtractor } from '../../common/helpers/extractors/data-internal.extractor';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IMaterialService } from '../../modules/material/types/material.service.interface';

@Injectable()
export class CharacteristicsMaterialService implements ICharacteristicsMaterialService {
  constructor(
    @Inject(KFI.CHARACTERISTICS_MATERIAL_REPOSITORY)
    private readonly characteristicsMaterialRepository: ICharacteristicsMaterialRepository,
    @Inject(KFI.FIELD_OF_CATEGORY_MATERIAL_SERVICE)
    private readonly fieldOfCategoryMaterialService: IFieldOfCategoryMaterialService,
    @Inject(KFI.MATERIAL_SERVICE)
    private readonly materialService: IMaterialService,
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
    fieldCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>> {
    const fieldOfCategoryMaterial = await this.fieldOfCategoryMaterialService.getById(fieldCategoryMaterialId);
    const { fieldTypeUuid, unitOfMeasurementUuid } = dataInternalExtractor(fieldOfCategoryMaterial);
    const createdCharacteristicsMaterial = await this.characteristicsMaterialRepository.create(
      dto,
      handbookId,
      materialId,
      fieldCategoryMaterialId,
      fieldTypeUuid,
      unitOfMeasurementUuid,
    );
    // DOC если вновь созданная характеристика участвует при формировании имени материала, то
    // нужно сразу же поменять наименование материала

    const allFieldsOfCategoryMaterial = dataInternalExtractor(
      await this.fieldOfCategoryMaterialService.getAllInCategoryMaterial(categoryMaterialId),
    );
    const fieldsInTemplateOfCategoryMaterial = allFieldsOfCategoryMaterial.filter(fieldOfCategoryMaterial => {
      const categoriesMaterialsTemplatesIncludesThisFieldUuids = fieldOfCategoryMaterial.categoriesMaterialsTemplatesIncludesThisField.map(
        categoryMaterial => {
          return categoryMaterial.uuid;
        },
      );
      return categoriesMaterialsTemplatesIncludesThisFieldUuids.includes(categoryMaterialId);
    });
    const fieldsInTemplateOfCategoryMaterialUuids = fieldsInTemplateOfCategoryMaterial.map(fieldInTemplateOfCategoryMaterial => {
      return fieldInTemplateOfCategoryMaterial.uuid;
    });
    const isNewCharacteristicInTemplate = fieldsInTemplateOfCategoryMaterialUuids.includes(
      createdCharacteristicsMaterial.fieldOfCategoryMaterial.uuid,
    );
    isNewCharacteristicInTemplate && (await this.materialService.rebuildNameForMaterialById(createdCharacteristicsMaterial.materialUuid));
    return new InternalResponse(createdCharacteristicsMaterial);
  }

  async updateById(
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>> {
    const updatedCharacteristicOfMaterial = await this.characteristicsMaterialRepository.updateById(characteristicsMaterialId, dto);
    // DOC если при обновлении характеристики поменялось значение и данная характеристика участвует при формировании имени материала, то
    // нужно сразу же поменять наименование материала
    if (dto.value) {
      const categoryMaterialId = updatedCharacteristicOfMaterial.material.categoryMaterialUuid;

      const allFieldsOfCategoryMaterial = dataInternalExtractor(
        await this.fieldOfCategoryMaterialService.getAllInCategoryMaterial(categoryMaterialId),
      );
      const fieldsInTemplateOfCategoryMaterial = allFieldsOfCategoryMaterial.filter(fieldOfCategoryMaterial => {
        const categoriesMaterialsTemplatesIncludesThisFieldUuids =
          fieldOfCategoryMaterial.categoriesMaterialsTemplatesIncludesThisField.map(categoryMaterial => {
            return categoryMaterial.uuid;
          });
        return categoriesMaterialsTemplatesIncludesThisFieldUuids.includes(categoryMaterialId);
      });
      const fieldsInTemplateOfCategoryMaterialUuids = fieldsInTemplateOfCategoryMaterial.map(fieldInTemplateOfCategoryMaterial => {
        return fieldInTemplateOfCategoryMaterial.uuid;
      });
      const isUpdatedCharacteristicInTemplate = fieldsInTemplateOfCategoryMaterialUuids.includes(
        updatedCharacteristicOfMaterial.fieldOfCategoryMaterial.uuid,
      );
      isUpdatedCharacteristicInTemplate &&
        (await this.materialService.rebuildNameForMaterialById(updatedCharacteristicOfMaterial.materialUuid));
    }
    return new InternalResponse(updatedCharacteristicOfMaterial);
  }

  async updateManyStatusByMaterialId(
    materialIdId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>> {
    const updatedCharacteristicsMaterial = await this.characteristicsMaterialRepository.updateManyStatusByMaterialId(materialIdId, dto);
    return new InternalResponse(updatedCharacteristicsMaterial);
  }

  async deleteById(
    characteristicsMaterialIdId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>> {
    const deletedCharacteristicsMaterial = await this.characteristicsMaterialRepository.deleteById(characteristicsMaterialIdId);
    return new InternalResponse(deletedCharacteristicsMaterial);
  }
}
