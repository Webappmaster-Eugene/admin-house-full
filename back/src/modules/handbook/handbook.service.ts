import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandbookEntity } from './entities/handbook.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IHandbookRepository } from './types/handbook.repository.interface';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { HandbookUpdateRequestDto } from './dto/controller/update-handbook.dto';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { IHandbookService } from './types/handbook.service.interface';
import { HandbookCreateRequestDto } from './dto/controller/create-handbook.dto';
import { ILogger } from '../../common/types/main/logger.interface';

@Injectable()
export class HandbookService implements IHandbookService {
  constructor(
    private readonly configService: ConfigService<IConfigService>,
    @Inject(KEYS_FOR_INJECTION.I_HANDBOOK_REPOSITORY)
    private readonly handbookRepository: IHandbookRepository,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER)
    private readonly logger: ILogger,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<HandbookEntity | null>> {
    try {
      const findedHandbook = await this.handbookRepository.getById(id);
      return new InternalResponse<HandbookEntity>(findedHandbook);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.HANDBOOK.HANDBOOK_NOT_GETTED_BY_ID,
      );
    }
  }

  async getByManagerId(
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<HandbookEntity | null>> {
    try {
      const findedHandbook =
        await this.handbookRepository.getByManagerId(managerId);
      return new InternalResponse<HandbookEntity>(findedHandbook);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.HANDBOOK.HANDBOOK_NOT_GETTED_BY_MANAGER_ID,
      );
    }
  }

  async getAll(): Promise<UniversalInternalResponse<HandbookEntity[] | null>> {
    try {
      const allHandbooks = await this.handbookRepository.getAll();
      return new InternalResponse<HandbookEntity[]>(allHandbooks);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.HANDBOOK.ALL_HANDBOOKS_NOT_GETTED,
      );
    }
  }

  // для создания Handbook нужно указать id пользователя (менеджера), для которого создается Handbook
  async create(
    dto: HandbookCreateRequestDto,
    user: IJWTPayload,
  ): Promise<UniversalInternalResponse<HandbookEntity | null>> {
    try {
      const createdHandbook = await this.handbookRepository.create(
        dto,
        user.uuid,
      );
      return new InternalResponse<HandbookEntity>(createdHandbook);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.HANDBOOK.HANDBOOK_NOT_CREATED,
      );
    }
  }

  async updateById(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: HandbookUpdateRequestDto,
  ): Promise<UniversalInternalResponse<HandbookEntity | null>> {
    try {
      const updatedHandbook = await this.handbookRepository.updateById(id, dto);
      return new InternalResponse<HandbookEntity>(updatedHandbook);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.HANDBOOK.HANDBOOK_NOT_UPDATED,
      );
    }
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<HandbookEntity | null>> {
    try {
      const deletedHandbook = await this.handbookRepository.deleteById(id);
      return new InternalResponse<HandbookEntity>(deletedHandbook);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.HANDBOOK.HANDBOOK_NOT_DELETED,
      );
    }
  }
}
