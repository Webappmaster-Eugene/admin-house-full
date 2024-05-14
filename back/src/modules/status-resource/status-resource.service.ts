import { Inject, Injectable } from '@nestjs/common';
import { StatusResourceEntity } from './entities/status-resource.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IStatusResourceRepository } from './types/status-resource.repository.interface';
import { StatusResourceUpdateRequestDto } from './dto/controller/update-status-resource.dto';
import { IStatusResourceService } from './types/status-resource.service.interface';
import { StatusResourceCreateRequestDto } from './dto/controller/create-status-resource.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class StatusResourceService implements IStatusResourceService {
  constructor(
    @Inject(KFI.STATUS_RESOURCE_REPOSITORY)
    private readonly statusResourceRepository: IStatusResourceRepository,
  ) {}

  async getById(statusResourceId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<StatusResourceEntity>> {
    const findedStatusResource = await this.statusResourceRepository.getById(statusResourceId);
    return new InternalResponse(findedStatusResource);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<StatusResourceEntity[]>> {
    const { skip, take } = queryParams;
    const allStatusResources = await this.statusResourceRepository.getAll(skip, take);
    return new InternalResponse(allStatusResources);
  }

  // для создания StatusResource нужно указать id пользователя (менеджера), для которого создается StatusResource
  async create(
    dto: StatusResourceCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<StatusResourceEntity>> {
    const createdStatusResource = await this.statusResourceRepository.create(dto, managerId);
    return new InternalResponse(createdStatusResource);
  }

  async updateById(
    statusResourceId: EntityUrlParamCommand.RequestUuidParam,
    dto: StatusResourceUpdateRequestDto,
  ): Promise<UniversalInternalResponse<StatusResourceEntity>> {
    const updatedStatusResource = await this.statusResourceRepository.updateById(statusResourceId, dto);
    return new InternalResponse(updatedStatusResource);
  }

  async deleteById(statusResourceId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<StatusResourceEntity>> {
    const deletedStatusResource = await this.statusResourceRepository.deleteById(statusResourceId);
    return new InternalResponse(deletedStatusResource);
  }
}
