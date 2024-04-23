import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FieldVariantsForSelectorFieldTypeCreateRequestDto } from './dto/controller/create-field-variants-for-selector-field-type.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldVariantsForSelectorFieldTypeRepository } from './types/field-variants-for-selector-field-type.repository.interface';
import { FieldVariantsForSelectorFieldTypeUpdateRequestDto } from './dto/controller/update-field-variants-for-selector-field-type.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { FieldVariantsForSelectorFieldTypeEntity } from './entities/field-variants-for-selector-field-type.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FieldVariantsForSelectorFieldTypeRepository
  implements IFieldVariantsForSelectorFieldTypeRepository
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldVariantsForSelectorFieldTypeEntity> {
    try {
      const findedFieldVariantsForSelectorFieldType =
        await this.databaseService.fieldVariantsForSelectorFieldType.findUnique(
          {
            where: {
              uuid: fieldVariantsForSelectorFieldTypeId,
            },
          },
        );

      if (findedFieldVariantsForSelectorFieldType) {
        return new FieldVariantsForSelectorFieldTypeEntity(
          findedFieldVariantsForSelectorFieldType,
        );
      } else {
        throw new NotFoundException({
          message: `FieldVariantsForSelectorFieldType with id=${fieldVariantsForSelectorFieldTypeId} not found`,
          description:
            'FieldVariantsForSelectorFieldType from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async getAll(): Promise<FieldVariantsForSelectorFieldTypeEntity[]> {
    try {
      const allFieldVariantsForSelectorFieldTypes =
        await this.databaseService.fieldVariantsForSelectorFieldType.findMany();
      return toEntityArray<FieldVariantsForSelectorFieldTypeEntity>(
        allFieldVariantsForSelectorFieldTypes,
        FieldVariantsForSelectorFieldTypeEntity,
      );
    } catch (error: unknown) {
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async create(
    dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldVariantsForSelectorFieldTypeEntity> {
    try {
      const {} = dto;
      const newFieldVariantsForSelectorFieldType =
        await this.databaseService.fieldVariantsForSelectorFieldType.create({
          data: {},
        });
      return new FieldVariantsForSelectorFieldTypeEntity(
        newFieldVariantsForSelectorFieldType,
      );
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(
            BackendErrorNames.CONFLICT_ERROR,
            jsonStringify(error),
          ),
        );
      }
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async updateById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    {}: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  ): Promise<FieldVariantsForSelectorFieldTypeEntity> {
    try {
      const updatedFieldVariantsForSelectorFieldType =
        await this.databaseService.fieldVariantsForSelectorFieldType.update({
          where: {
            uuid: fieldVariantsForSelectorFieldTypeId,
          },
          data: {},
        });

      return new FieldVariantsForSelectorFieldTypeEntity(
        updatedFieldVariantsForSelectorFieldType,
      );
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async deleteById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldVariantsForSelectorFieldTypeEntity> {
    try {
      const deletedFieldVariantsForSelectorFieldType =
        await this.databaseService.fieldVariantsForSelectorFieldType.delete({
          where: {
            uuid: fieldVariantsForSelectorFieldTypeId,
          },
        });

      return new FieldVariantsForSelectorFieldTypeEntity(
        deletedFieldVariantsForSelectorFieldType,
      );
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }
}
