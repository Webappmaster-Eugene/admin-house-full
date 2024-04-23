import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldTypeRepository } from './types/field-type.repository.interface';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FieldTypeEntity } from './entities/field-type.entity';
import { FieldTypeCreateRequestDto } from './dto/controller/create-field-type.dto';

@Injectable()
export class FieldTypeRepository implements IFieldTypeRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldTypeEntity> {
    try {
      const findedTypeField = await this.databaseService.fieldType.findUnique({
        where: {
          uuid: fieldTypeId,
        },
      });

      if (findedTypeField) {
        return new FieldTypeEntity(findedTypeField);
      } else {
        throw new NotFoundException({
          message: `FieldType with id=${fieldTypeId} not found`,
          description:
            'FieldType from your request did not found in the database',
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
  async getAll(): Promise<FieldTypeEntity[]> {
    try {
      const allFieldTypes = await this.databaseService.fieldType.findMany();
      return toEntityArray<FieldTypeEntity>(allFieldTypes, FieldTypeEntity);
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
    dto: FieldTypeCreateRequestDto,
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldTypeEntity> {
    try {
      const {} = dto;
      const newTypeField = await this.databaseService.fieldType.create({
        data: {},
      });
      return new FieldTypeEntity(newTypeField);
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
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: FieldTypeCreateRequestDto,
  ): Promise<FieldTypeEntity> {
    try {
      const updatedTypeField = await this.databaseService.fieldType.update({
        where: {
          uuid: typeFieldId,
        },
        data: {
          name,
          description,
        },
      });

      return new FieldTypeEntity(updatedTypeField);
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
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldTypeEntity> {
    try {
      const deletedTypeField = await this.databaseService.fieldType.delete({
        where: {
          uuid: fieldTypeId,
        },
      });

      return new FieldTypeEntity(deletedTypeField);
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
