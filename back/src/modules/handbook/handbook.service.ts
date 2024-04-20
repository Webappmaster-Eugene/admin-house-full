import { Inject, Injectable } from '@nestjs/common';
import { HandbookEntity } from './entities/handbook.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IHandbookRepository } from './types/handbook.repository.interface';
import { HandbookUpdateRequestDto } from './dto/controller/update-handbook.dto';
import { IHandbookService } from './types/handbook.service.interface';
import { HandbookCreateRequestDto } from './dto/controller/create-handbook.dto';

@Injectable()
export class HandbookService implements IHandbookService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_HANDBOOK_REPOSITORY)
    private readonly handbookRepository: IHandbookRepository,
  ) {}

  async getById(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<HandbookEntity>> {
    const findedHandbook = await this.handbookRepository.getById(handbookId);
    return new InternalResponse<HandbookEntity>(findedHandbook);
  }

  async getByManagerId(
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<HandbookEntity>> {
    const findedHandbook =
      await this.handbookRepository.getByManagerId(managerId);
    return new InternalResponse<HandbookEntity>(findedHandbook);
  }

  async getAll(): Promise<UniversalInternalResponse<HandbookEntity[]>> {
    const allHandbooks = await this.handbookRepository.getAll();
    return new InternalResponse<HandbookEntity[]>(allHandbooks);
  }

  // для создания Handbook нужно указать id пользователя (менеджера), для которого создается Handbook
  async create(
    dto: HandbookCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<HandbookEntity>> {
    const createdHandbook = await this.handbookRepository.create(
      dto,
      managerId,
    );
    return new InternalResponse<HandbookEntity>(createdHandbook);
  }

  async updateById(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    dto: HandbookUpdateRequestDto,
  ): Promise<UniversalInternalResponse<HandbookEntity>> {
    const updatedHandbook = await this.handbookRepository.updateById(
      handbookId,
      dto,
    );
    return new InternalResponse<HandbookEntity>(updatedHandbook);
  }

  async deleteById(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<HandbookEntity>> {
    const deletedHandbook =
      await this.handbookRepository.deleteById(handbookId);
    return new InternalResponse<HandbookEntity>(deletedHandbook);
  }
}
