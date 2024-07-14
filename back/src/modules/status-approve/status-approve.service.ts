import { Inject, Injectable } from '@nestjs/common';
import { EntityUrlParamCommand } from 'libs/contracts';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IStatusApproveRepository } from './types/status-approve.repository.interface';
import { StatusApproveUpdateRequestDto } from 'src/modules/status-approve/dto/controller/update-status-approve.dto';
import { IStatusApproveService } from './types/status-approve.service.interface';
import { StatusApproveCreateRequestDto } from 'src/modules/status-approve/dto/controller/create-status-approve.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';
import { StatusApproveEntity } from 'src/modules/status-approve/entities/status-approve.entity';

@Injectable()
export class StatusApproveService implements IStatusApproveService {
  constructor(
    @Inject(KFI.STATUS_APPROVE_REPOSITORY)
    private readonly statusApproveRepository: IStatusApproveRepository,
  ) {}

  async getById(statusApproveId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<StatusApproveEntity>> {
    const findedStatusApprove = await this.statusApproveRepository.getById(statusApproveId);
    return new InternalResponse(findedStatusApprove);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<StatusApproveEntity[]>> {
    const { skip, take } = queryParams;
    const allStatusApproves = await this.statusApproveRepository.getAll(skip, take);
    return new InternalResponse(allStatusApproves);
  }

  async create(dto: StatusApproveCreateRequestDto): Promise<UniversalInternalResponse<StatusApproveEntity>> {
    const createdStatusApprove = await this.statusApproveRepository.create(dto);
    return new InternalResponse(createdStatusApprove);
  }

  async updateById(
    statusApproveId: EntityUrlParamCommand.RequestUuidParam,
    dto: StatusApproveUpdateRequestDto,
  ): Promise<UniversalInternalResponse<StatusApproveEntity>> {
    const updatedStatusApprove = await this.statusApproveRepository.updateById(statusApproveId, dto);
    return new InternalResponse(updatedStatusApprove);
  }

  async deleteById(statusApproveId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<StatusApproveEntity>> {
    const deletedStatusApprove = await this.statusApproveRepository.deleteById(statusApproveId);
    return new InternalResponse(deletedStatusApprove);
  }
}
