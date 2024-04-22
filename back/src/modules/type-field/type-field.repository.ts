import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TypeFieldCreateRequestDto } from './dto/controller/create-type-field.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { ITypeFieldRepository } from './types/type-field.repository.interface';
import { TypeFieldUpdateRequestDto } from './dto/controller/update-type-field.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { TypeFieldEntity } from './entities/type-field.entity';
import { toEntityArray } from '../../common/utils/mappers';
import {
  DEFAULT_HANDBOOK_DESCRIPTION,
  DEFAULT_HANDBOOK_NAME,
} from './lib/consts/type-field.default-data';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TypeFieldRepository implements ITypeFieldRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<TypeFieldEntity> {
    try {
      const findedTypeField = await this.databaseService.typeField.findUnique({
        where: {
          uuid: typeFieldId,
        },
      });

      if (findedTypeField) {
        return new TypeFieldEntity(findedTypeField);
      } else {
        throw new NotFoundException({
          message: `TypeField with id=${typeFieldId} not found`,
          description:
            'TypeField from your request did not found in the database',
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
  async getAll(): Promise<TypeFieldEntity[]> {
    try {
      const allTypeFields =
        (await this.databaseService.type) - field.findMany();
      return toEntityArray<TypeFieldEntity>(allTypeFields, TypeFieldEntity);
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
    dto: TypeFieldCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<TypeFieldEntity> {
    try {
      const { name, description, canCustomerView, workspaceUuid } = dto;
      const newTypeField =
        (await this.databaseService.type) -
        field.create({
          data: {},
        });
      return new TypeFieldEntity(newTypeField);
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
    { name, description }: TypeFieldUpdateRequestDto,
  ): Promise<TypeFieldEntity> {
    try {
      const updatedTypeField = await this.databaseService.typeField.update({
        where: {
          uuid: typeFieldId,
        },
        data: {
          name,
          description,
        },
      });

      return new TypeFieldEntity(updatedTypeField);
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
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<TypeFieldEntity> {
    try {
      const deletedTypeField = await this.databaseService.typeField.delete({
        where: {
          uuid: typeFieldId,
        },
      });

      return new TypeFieldEntity(deletedTypeField);
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
