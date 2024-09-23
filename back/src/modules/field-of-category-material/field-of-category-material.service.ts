import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EntityUrlParamCommand } from 'libs/contracts';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { FieldOfCategoryMaterialEntity } from './entities/field-of-category-material.entity';
import { IFieldOfCategoryMaterialRepository } from './types/field-of-category-material.repository.interface';
import { IFieldOfCategoryMaterialService } from './types/field-of-category-material.service.interface';
import { FieldOfCategoryMaterialUpdateRequestDto } from './dto/controller/update-field-of-category-material.dto';
import { FieldOfCategoryMaterialCreateRequestDto } from './dto/controller/create-field-of-category-material.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';
import { dataInternalExtractor } from '../../common/helpers/extractors/data-internal.extractor';
import { ICategoryMaterialService } from '../../modules/category-material/types/category-material.service.interface';
import { ModuleRef } from '@nestjs/core';
import { CategoryMaterialService } from '../../modules/category-material/category-material.service';
import { IMaterialService } from '../../modules/material/types/material.service.interface';

@Injectable()
// ,OnModuleInit
export class FieldOfCategoryMaterialService implements IFieldOfCategoryMaterialService {
  //private categoryMaterialService: ICategoryMaterialService;
  //private categoryMaterialService: CategoryMaterialService;

  constructor(
    @Inject(KFI.FIELD_OF_CATEGORY_MATERIAL_REPOSITORY)
    private readonly fieldOfCategoryMaterialRepository: IFieldOfCategoryMaterialRepository,
    //@Inject(KFI.FIELD_OF_CATEGORY_MATERIAL__CATEGORY_MATERIAL_SERVICE)
    //private readonly fieldOfCategoryMaterial_сategoryMaterialService: IFieldOfCategoryMaterial_CategoryMaterialService,
    // @Inject(KFI.CATEGORY_MATERIAL_SERVICE)
    // private categoryMaterialService: ICategoryMaterialService,
    // @Inject(KFI.MATERIAL_SERVICE)
    // private materialService: IMaterialService,
    @Inject(forwardRef(() => KFI.CATEGORY_MATERIAL_SERVICE))
    private readonly categoryMaterialService: ICategoryMaterialService,

    //private moduleRef: ModuleRef,
  ) {}

  // async onModuleInit() {
  //   this.categoryMaterialService = await this.moduleRef.resolve(CategoryMaterialService);
  // }

  async getById(
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>> {
    const findedFieldOfCategoryMaterial = await this.fieldOfCategoryMaterialRepository.getById(fieldOfCategoryMaterialId);
    return new InternalResponse(findedFieldOfCategoryMaterial);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allFieldOfCategoryMaterials = await this.fieldOfCategoryMaterialRepository.getAll(skip, take);
    return new InternalResponse(allFieldOfCategoryMaterials);
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allFieldOfCategoryMaterials = await this.fieldOfCategoryMaterialRepository.getAllInHandbook(handbookId, skip, take);
    return new InternalResponse(allFieldOfCategoryMaterials);
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allFieldOfCategoryMaterials = await this.fieldOfCategoryMaterialRepository.getAllInCategoryMaterial(
      categoryMaterialId,
      skip,
      take,
    );
    return new InternalResponse(allFieldOfCategoryMaterials);
  }

  async create(
    dto: FieldOfCategoryMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>> {
    const createdFieldOfCategoryMaterial = await this.fieldOfCategoryMaterialRepository.create(dto, handbookId, categoryMaterialId, userId);
    return new InternalResponse(createdFieldOfCategoryMaterial);
  }

  async updateById(
    fieldOfCategoryMaterialIdId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfCategoryMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>> {
    const oldFieldOfCategoryMaterial = dataInternalExtractor(await this.getById(fieldOfCategoryMaterialIdId));
    //DOC categoriesMaterialsTemplatesIncludesThisField может изменяться только со стороны категории
    //DOC так как составить шаблон можно только при изменении категории с помощью специального инпута и никак иначе

    // DOC в самом репозитории внутри проиcходит изменение templateName (если необходимо)
    const updatedFieldOfCategoryMaterial = await this.fieldOfCategoryMaterialRepository.updateById(fieldOfCategoryMaterialIdId, dto);

    // DOC если шаблон не пустой и если данное поле участвует в составлении шаблона и если isNameOrTypeChanged=true
    const isCategoryMaterialNameMustChange =
      (dto.fieldTypeUuid || dto.name) && oldFieldOfCategoryMaterial.categoriesMaterialsTemplatesIncludesThisField.length > 0;
    if (isCategoryMaterialNameMustChange) {
      oldFieldOfCategoryMaterial.categoriesMaterialsTemplatesIncludesThisField.map(async categoryMaterial => {
        await this.categoryMaterialService.rebuildCategoryMaterialNameById(categoryMaterial.uuid);
        //await this.fieldOfCategoryMaterial_сategoryMaterialService.rebuildCategoryMaterialNameById(categoryMaterial.uuid);
      });
    }
    return new InternalResponse(updatedFieldOfCategoryMaterial);
  }

  async deleteById(
    fieldOfCategoryMaterialIdId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>> {
    const deletedFieldOfCategoryMaterial = await this.fieldOfCategoryMaterialRepository.deleteById(fieldOfCategoryMaterialIdId);
    return new InternalResponse(deletedFieldOfCategoryMaterial);
  }
}
