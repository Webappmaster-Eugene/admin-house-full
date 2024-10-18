import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CategoryMaterialEntity } from './entities/category-material.entity';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { ICategoryMaterialRepository } from './types/category-material.repository.interface';
import { CategoryMaterialUpdateRequestDto } from './dto/controller/update-category-material.dto';
import { ICategoryMaterialService } from './types/category-material.service.interface';
import { CategoryMaterialCreateRequestDto } from './dto/controller/create-category-material.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';
import { EntityUrlParamCommand } from 'libs/contracts';
import { dataInternalExtractor } from '../../common/helpers/extractors/data-internal.extractor';
import { IMaterialService } from '../../modules/material/types/material.service.interface';
import { ICharacteristicsMaterialService } from '../../modules/characteristics-material/types/characteristics-material.service.interface';

@Injectable()
export class CategoryMaterialService implements ICategoryMaterialService {
  constructor(
    @Inject(KFI.CATEGORY_MATERIAL_REPOSITORY)
    private readonly categoryMaterialRepository: ICategoryMaterialRepository,
    @Inject(KFI.CHARACTERISTICS_MATERIAL_SERVICE)
    private readonly characteristicsMaterialService: ICharacteristicsMaterialService,
    @Inject(forwardRef(() => KFI.MATERIAL_SERVICE))
    private readonly materialService: IMaterialService,
  ) {}

  async getById(categoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const findedCategoryMaterial = await this.categoryMaterialRepository.getById(categoryMaterialId);
    return new InternalResponse(findedCategoryMaterial);
  }

  async getDefaultCategory(handbookId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const findedCategoryMaterial = await this.categoryMaterialRepository.getDefaultCategory(handbookId);
    return new InternalResponse(findedCategoryMaterial);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<CategoryMaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allCategoryMaterials = await this.categoryMaterialRepository.getAll(skip, take);
    return new InternalResponse(allCategoryMaterials);
  }

  async getAllWithIds(
    categoryIds: EntityUrlParamCommand.RequestUuidParam[],
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allCategoryMaterialsWithIds = await this.categoryMaterialRepository.getAllWithIds(categoryIds, skip, take);
    return new InternalResponse(allCategoryMaterialsWithIds);
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allCategoryMaterials = await this.categoryMaterialRepository.getAllInHandbook(handbookId, skip, take);
    return new InternalResponse(allCategoryMaterials);
  }

  async create(
    dto: CategoryMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const createdCategoryMaterial = await this.categoryMaterialRepository.create(dto, handbookId);
    const isTemplateCreatedWithCategories =
      Array.isArray(dto.fieldsOfCategoryMaterialsInTemplate) && dto.fieldsOfCategoryMaterialsInTemplate?.length > 0;

    if (isTemplateCreatedWithCategories) {
      const allMaterialsInCategory = dataInternalExtractor(
        await this.materialService.getAllInCategoryMaterial(createdCategoryMaterial.uuid),
      );
      allMaterialsInCategory.length > 0 &&
        allMaterialsInCategory.map(async materialInCategory => {
          await this.materialService.rebuildNameForMaterialById(materialInCategory.uuid);
        });
    }
    return new InternalResponse(createdCategoryMaterial);
  }

  async updateById(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const findedFieldsOfCategoryMaterialInTemplateIds = dataInternalExtractor(
      await this.getById(categoryMaterialId),
    ).fieldsOfCategoryMaterialsInTemplate?.map(fieldOfCategoryMaterialsInTemplate => fieldOfCategoryMaterialsInTemplate.uuid);

    const isTemplateUpdatedWithCurrentCategory =
      (Array.isArray(findedFieldsOfCategoryMaterialInTemplateIds) &&
        findedFieldsOfCategoryMaterialInTemplateIds?.length !== dto.fieldsOfCategoryMaterialsInTemplate.length) ||
      dto.fieldsOfCategoryMaterialsInTemplate.some(newFieldOfCategoryMaterialsInTemplate => {
        return findedFieldsOfCategoryMaterialInTemplateIds.indexOf(newFieldOfCategoryMaterialsInTemplate.uuid) === -1;
      });
    const updatedCategoryMaterial = await this.categoryMaterialRepository.updateById(categoryMaterialId, dto);

    if (isTemplateUpdatedWithCurrentCategory) {
      const allMaterialsInCategory = dataInternalExtractor(await this.materialService.getAllInCategoryMaterial(categoryMaterialId));
      allMaterialsInCategory.map(async materialInCategory => {
        const allCharacteristicsOfCurrentMaterial = dataInternalExtractor(
          await this.characteristicsMaterialService.getAllInMaterial(materialInCategory.uuid),
        );
        const unusedCharacteristicsOfMaterial = allCharacteristicsOfCurrentMaterial.filter(characteristicOfCurrentMaterial => {
          return !findedFieldsOfCategoryMaterialInTemplateIds.includes(characteristicOfCurrentMaterial.fieldOfCategoryMaterial.uuid);
        });
        unusedCharacteristicsOfMaterial.map(async unusedCharacteristicOfMaterial => {
          await this.characteristicsMaterialService.updateById(unusedCharacteristicOfMaterial.uuid, {
            characteristicsMaterialStatus: 'INACTIVE',
          });
        });
        await this.materialService.rebuildNameForMaterialById(materialInCategory.uuid);
      });
    }
    return new InternalResponse(updatedCategoryMaterial);
  }

  async rebuildCategoryMaterialNameById(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const updatedCategoryMaterial = await this.categoryMaterialRepository.rebuildCategoryMaterialNameById(categoryMaterialId);

    const allMaterialsInCategory = dataInternalExtractor(await this.materialService.getAllInCategoryMaterial(categoryMaterialId));
    console.log('allMaterialsInCategory' + JSON.stringify(allMaterialsInCategory));

    allMaterialsInCategory.map(async materialInCategory => {
      await this.materialService.rebuildNameForMaterialById(materialInCategory.uuid);
    });
    return new InternalResponse(updatedCategoryMaterial);
  }

  async deleteById(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const allMaterialsInCategory = dataInternalExtractor(await this.materialService.getAllInCategoryMaterial(categoryMaterialId));

    const materialIdsToReplace = allMaterialsInCategory.map(materialInCategory => materialInCategory.uuid);
    console.log('deleteById1 ');
    const commonCategoryOfCurrentWorkspace = dataInternalExtractor(await this.getDefaultCategory(handbookId));
    //await this.categoryMaterialRepository.disconnectMaterials(categoryMaterialId, materialIdsToReplace);
    //await this.materialService.changeManyMaterialsCategoryById(materialIdsToReplace, commonCategoryOfCurrentWorkspace.uuid);
    console.log('deleteById2 ');
    console.log('deleteById3 ');
    const deletedCategoryMaterial = await this.categoryMaterialRepository.deleteById(categoryMaterialId);
    //const deletedCategoryMaterial = await this.categoryMaterialRepository.getById(categoryMaterialId);
    console.log('deleteById4 ');
    return new InternalResponse(deletedCategoryMaterial);
  }

  async deleteManyByIds(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialIds: EntityUrlParamCommand.RequestUuidParam[],
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity[]>> {
    const deletedCategoriesToResponse = dataInternalExtractor(await this.getAllWithIds(categoryMaterialIds));
    const commonCategoryOfCurrentWorkspace = dataInternalExtractor(await this.getDefaultCategory(handbookId));

    categoryMaterialIds.map(async categoryMaterialId => {
      const allMaterialsInCategory = dataInternalExtractor(await this.materialService.getAllInCategoryMaterial(categoryMaterialId));
      const materialIdsToReplace = allMaterialsInCategory.map(materialInCategory => materialInCategory.uuid);
      await this.materialService.changeManyMaterialsCategoryById(materialIdsToReplace, commonCategoryOfCurrentWorkspace.uuid);
      await this.categoryMaterialRepository.disconnectMaterials(categoryMaterialId, materialIdsToReplace);
      const deletedCategoryMaterial = await this.categoryMaterialRepository.deleteById(categoryMaterialId);
    });

    //const deletedCategoryMaterials = await this.categoryMaterialRepository.deleteManyByIds(categoryMaterialIds);
    return new InternalResponse(deletedCategoriesToResponse);
  }
}
