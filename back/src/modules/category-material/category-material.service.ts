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
    //@Inject(KFI.MATERIAL_SERVICE)
    //private readonly materialService: IMaterialService,
    //@Inject(forwardRef(() => KFI.MATERIAL_SERVICE)),
    @Inject(forwardRef(() => KFI.MATERIAL_SERVICE))
    private readonly materialService: IMaterialService,
  ) {}

  async getById(categoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const findedCategoryMaterial = await this.categoryMaterialRepository.getById(categoryMaterialId);
    return new InternalResponse(findedCategoryMaterial);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<CategoryMaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allCategoryMaterials = await this.categoryMaterialRepository.getAll(skip, take);
    return new InternalResponse(allCategoryMaterials);
  }

  // async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<CategoryMaterialEntity[]>> {
  //   const { skip, take } = queryParams || {};
  //   const allCategoryMaterials = await this.categoryMaterialRepository.getAll(skip, take);
  //   return new InternalResponse(allCategoryMaterials);
  // }

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
    const isTemplateCreatedWithCategories = dto.fieldsOfCategoryMaterialsInTemplate.length > 0;
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
    const findedCategoryMaterialIds = dataInternalExtractor(await this.getById(categoryMaterialId)).fieldsOfCategoryMaterialsInTemplate.map(
      fieldOfCategoryMaterialsInTemplate => fieldOfCategoryMaterialsInTemplate.uuid,
    );
    const isTemplateUpdatedWithCategories =
      findedCategoryMaterialIds.length !== dto.fieldsOfCategoryMaterialsInTemplate.length ||
      dto.fieldsOfCategoryMaterialsInTemplate.some(fieldOfCategoryMaterialsInTemplate => {
        return findedCategoryMaterialIds.indexOf(fieldOfCategoryMaterialsInTemplate.uuid) === -1;
      });
    const updatedCategoryMaterial = await this.categoryMaterialRepository.updateById(categoryMaterialId, dto);

    if (isTemplateUpdatedWithCategories) {
      const allMaterialsInCategory = dataInternalExtractor(await this.materialService.getAllInCategoryMaterial(categoryMaterialId));
      allMaterialsInCategory.map(async materialInCategory => {
        const allCharacteristicsOfCurrentMaterial = dataInternalExtractor(
          await this.characteristicsMaterialService.getAllInMaterial(materialInCategory.uuid),
        );
        const unusedCharacteristicsOfMaterial = allCharacteristicsOfCurrentMaterial.filter(characteristicOfCurrentMaterial => {
          return !findedCategoryMaterialIds.includes(characteristicOfCurrentMaterial.fieldOfCategoryMaterial.uuid);
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
    allMaterialsInCategory.map(async materialInCategory => {
      await this.materialService.rebuildNameForMaterialById(materialInCategory.uuid);
    });
    return new InternalResponse(updatedCategoryMaterial);
  }

  async deleteById(categoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const deletedCategoryMaterial = await this.categoryMaterialRepository.deleteById(categoryMaterialId);
    return new InternalResponse(deletedCategoryMaterial);
  }

  // async deleteManyByIds(
  //   categoryMaterialIds: EntityUrlParamCommand.RequestUuidParam,
  // ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
  //   const categoryMaterialId = dataInternalExtractor(await getAll;
  //   const deletedCategoryMaterial = await this.categoryMaterialRepository.deleteById(categoryMaterialId);
  //   return new InternalResponse(deletedCategoryMaterial);
  // }
}
