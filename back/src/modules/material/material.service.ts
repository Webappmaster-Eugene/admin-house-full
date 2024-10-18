import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
import { MaterialUpdateNameRequestDto } from '../../modules/material/dto/controller/update-name-material.dto';
import { MaterialUpdateCategoryRequestDto } from '../../modules/material/dto/controller/update-category-material.dto';
import { ICharacteristicsMaterialService } from '../../modules/characteristics-material/types/characteristics-material.service.interface';
import { IFieldOfCategoryMaterialService } from '../../modules/field-of-category-material/types/field-of-category-material.service.interface';
import { BackendErrorNames, InternalError } from '../../common/errors';

@Injectable()
export class MaterialService implements IMaterialService {
  constructor(
    @Inject(KFI.MATERIAL_REPOSITORY)
    private readonly materialRepository: IMaterialRepository,
    @Inject(KFI.PRICE_CHANGING_SERVICE)
    private readonly priceChangingService: IPriceChangingService,
    @Inject(KFI.CHARACTERISTICS_MATERIAL_SERVICE)
    private readonly characteristicsMaterialService: ICharacteristicsMaterialService,
    // @Inject(KFI.CATEGORY_MATERIAL_SERVICE)
    // private readonly categoryMaterialService: ICategoryMaterialService,
    // @Inject(KFI.FIELD_OF_CATEGORY_MATERIAL_SERVICE)
    // private readonly fieldOfCategoryMaterialService: IFieldOfCategoryMaterialService,
    @Inject(forwardRef(() => KFI.FIELD_OF_CATEGORY_MATERIAL_SERVICE))
    private readonly fieldOfCategoryMaterialService: IFieldOfCategoryMaterialService,
  ) {}

  async getById(materialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<MaterialEntity>> {
    const findedMaterial = await this.materialRepository.getById(materialId);
    return new InternalResponse(findedMaterial);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<MaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allMaterials = await this.materialRepository.getAll(skip, take);
    return new InternalResponse(allMaterials);
  }

  async getAllWithIds(
    ids: EntityUrlParamCommand.RequestUuidParam[],
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<MaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allMaterialsWithIds = await this.materialRepository.getAllWithIds(ids, skip, take);
    return new InternalResponse(allMaterialsWithIds);
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<MaterialEntity[]>> {
    const { skip, take } = queryParams || {};
    const allMaterials = await this.materialRepository.getAllInHandbook(handbookId, skip, take);
    return new InternalResponse(allMaterials);
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<MaterialEntity[]>> {
    const { skip, take } = queryParams || {};
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
    const requiredFieldsOfMaterial = dataInternalExtractor(
      await this.fieldOfCategoryMaterialService.getAllInCategoryMaterial(oldMaterialData.categoryMaterialUuid),
    )
      .filter(fieldOfCategoryMaterial => fieldOfCategoryMaterial.isRequired)
      .map(fieldOfCategoryMaterial => fieldOfCategoryMaterial.uuid);
    const requiredCharacteristics = oldMaterialData.characteristicsMaterial
      .filter(characteristic => characteristic.characteristicsMaterialStatus === 'ACTIVE')
      .map(characteristic => characteristic.fieldOfCategoryMaterialUuid);
    if (
      requiredCharacteristics.length !== 0 &&
      requiredFieldsOfMaterial.some(fieldOfMaterial => requiredCharacteristics.indexOf(fieldOfMaterial) === -1)
    ) {
      throw new InternalResponse(new InternalError(BackendErrorNames.REQUIRED_CHARCS_ARE_EMPTY_ERROR));
    }

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
    const updatedMaterial = await this.materialRepository.updateById(materialId, dto);
    return new InternalResponse(updatedMaterial);
  }

  async updateNameForMaterialById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateNameRequestDto,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    const oldMaterialData = dataInternalExtractor(await this.getById(materialId));
    const requiredFieldsOfMaterial = dataInternalExtractor(
      await this.fieldOfCategoryMaterialService.getAllInCategoryMaterial(oldMaterialData.categoryMaterialUuid),
    )
      .filter(fieldOfCategoryMaterial => fieldOfCategoryMaterial.isRequired)
      .map(fieldOfCategoryMaterial => fieldOfCategoryMaterial.uuid);
    const requiredCharacteristics = oldMaterialData.characteristicsMaterial
      .filter(characteristic => characteristic.characteristicsMaterialStatus === 'ACTIVE')
      .map(characteristic => characteristic.fieldOfCategoryMaterialUuid);
    if (
      dto?.name &&
      requiredCharacteristics.length === requiredFieldsOfMaterial.length &&
      requiredFieldsOfMaterial.every(fieldOfMaterial => requiredCharacteristics.indexOf(fieldOfMaterial) !== -1)
    ) {
      throw new InternalResponse(new InternalError(BackendErrorNames.CANT_CHANGE_NAME_MATERIAL_ERROR));
    }
    //DOC - если у материала есть характеристики и одно из обязательных полей отсутствует в активных характеристиках, то
    // запрещаем изменять имя. Или же характеристик больше чем обязательных полей, значит тоже нельзя (но это невозможно
    // так как после изменения шаблона категории автоматически меняются названия всех материалов в данной категории
    // и все ненужные характеристики от данных материалов отвязываются в materialService (update)
    if (
      requiredCharacteristics.length !== 0 &&
      requiredFieldsOfMaterial.some(fieldOfMaterial => requiredCharacteristics.indexOf(fieldOfMaterial) === -1)
    ) {
      throw new InternalResponse(new InternalError(BackendErrorNames.REQUIRED_CHARCS_ARE_EMPTY_ERROR));
    }
    const updatedMaterial = await this.materialRepository.updateNameForMaterialById(materialId, dto);
    return new InternalResponse(updatedMaterial);
  }

  async rebuildNameForMaterialById(materialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<MaterialEntity>> {
    const findedMaterial = dataInternalExtractor(await this.getById(materialId));
    const rebuildedMaterial = await this.materialRepository.rebuildNameForMaterialById(findedMaterial);
    return new InternalResponse(rebuildedMaterial);
  }

  async changeManyMaterialsCategoryById(
    materialIds: EntityUrlParamCommand.RequestUuidParam[],
    newCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<MaterialEntity[]>> {
    const updatedMaterials = materialIds.map(async materialId => {
      await this.changeMaterialCategoryById(materialId, { categoryMaterialUuid: newCategoryMaterialId });
    });
    const updatedMaterialsToResponse = dataInternalExtractor(await this.getAllWithIds(materialIds));
    return new InternalResponse(updatedMaterialsToResponse);
  }

  async changeMaterialCategoryById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateCategoryRequestDto,
  ): Promise<UniversalInternalResponse<MaterialEntity>> {
    //console.log('updatedMaterial0' + materialId + JSON.stringify(dto));
    // инфо о категории на начальный момент
    const oldMaterialData = dataInternalExtractor(await this.getById(materialId));
    console.log('updatedMaterial11 ' + JSON.stringify(oldMaterialData));
    // взять только обязательные поля из старой категории материала
    // const requiredFieldsOfMaterial = dataInternalExtractor(
    //   await this.fieldOfCategoryMaterialService.getAllInCategoryMaterial(oldMaterialData.categoryMaterialUuid),
    // )
    //   .filter(fieldOfCategoryMaterial => fieldOfCategoryMaterial.isRequired)
    //   .map(fieldOfCategoryMaterial => fieldOfCategoryMaterial.uuid);
    //
    // // взять все характеристики материала
    // const allMaterialCharacteristics = oldMaterialData.characteristicsMaterial
    //   .filter(characteristic => characteristic.characteristicsMaterialStatus === 'ACTIVE')
    //   .map(characteristic => characteristic.fieldOfCategoryMaterialUuid);

    // if (
    //     allMaterialCharacteristics.length !== 0 &&
    //   requiredFieldsOfMaterial.some(fieldOfMaterial => requiredCharacteristics.indexOf(fieldOfMaterial) === -1)
    // ) {
    //   throw new InternalResponse(new InternalError(BackendErrorNames.REQUIRED_CHARCS_ARE_EMPTY_ERROR));
    // }

    const updatedMaterial = await this.materialRepository.changeCategoryMaterialById(materialId, dto);

    console.log('updatedMaterial12 ' + JSON.stringify(updatedMaterial));

    // const inActiveCharacteristics = dataInternalExtractor(
    //   await this.characteristicsMaterialService.updateManyStatusByMaterialId(materialId, { characteristicsMaterialStatus: 'INACTIVE' }),
    // );
    const updatedMaterialWithoutCharacteristics = await this.materialRepository.getById(materialId);
    console.log('updatedMaterial13 ' + JSON.stringify(updatedMaterialWithoutCharacteristics));

    return new InternalResponse(updatedMaterialWithoutCharacteristics);
  }

  async deleteById(materialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<MaterialEntity>> {
    const deletedMaterial = await this.materialRepository.deleteById(materialId);
    return new InternalResponse(deletedMaterial);
  }
}
