import { Inject, Injectable } from '@nestjs/common';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { FieldOfMaterialEntity } from './entities/field-of-material.entity';
import { IFieldOfMaterialRepository } from './types/field-of-material.repository.interface';
import { IFieldOfMaterialService } from './types/field-of-material.service.interface';
import { FieldOfMaterialUpdateRequestDto } from './dto/controller/update-field-of-material.dto';
import { FieldOfMaterialCreateRequestDto } from './dto/controller/create-field-of-material.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class FieldOfMaterialService implements IFieldOfMaterialService {
  constructor(
    @Inject(KFI.FIELD_OF_MATERIAL_REPOSITORY)
    private readonly fieldOfMaterialRepository: IFieldOfMaterialRepository,
  ) {}

  async getById(fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<FieldOfMaterialEntity>> {
    const findedFieldOfMaterial = await this.fieldOfMaterialRepository.getById(fieldOfMaterialId);
    return new InternalResponse(findedFieldOfMaterial);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<FieldOfMaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allFieldOfMaterials = await this.fieldOfMaterialRepository.getAll(skip, take);
    return new InternalResponse(allFieldOfMaterials);
  }

  async create(
    dto: FieldOfMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldOfMaterialEntity>> {
    const createdFieldOfMaterial = await this.fieldOfMaterialRepository.create(dto, handbookId, userId);
    return new InternalResponse(createdFieldOfMaterial);
  }

  async updateById(
    fieldOfMaterialIdId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<FieldOfMaterialEntity>> {
    const updatedFieldOfMaterial = await this.fieldOfMaterialRepository.updateById(fieldOfMaterialIdId, dto);
    return new InternalResponse(updatedFieldOfMaterial);
  }

  async deleteById(fieldOfMaterialIdId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<FieldOfMaterialEntity>> {
    const deletedFieldOfMaterial = await this.fieldOfMaterialRepository.deleteById(fieldOfMaterialIdId);
    return new InternalResponse(deletedFieldOfMaterial);
  }
}
