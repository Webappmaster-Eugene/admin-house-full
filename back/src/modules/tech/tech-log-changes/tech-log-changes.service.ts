import { Inject, Injectable } from '@nestjs/common';
import { TechLogChangesEntity } from '../../../modules/tech/tech-log-changes/entities/tech-log-changes.entity';
import { ITechLogChangesService } from '../../../modules/tech/tech-log-changes/types/tech-log-changes.service.interface';
import { TechLogChangesCreateRequestDto } from '../../../modules/tech/tech-log-changes/dto/controller/create-tech-log-changes.dto';
import { ITechLogChangesRepository } from '../../../modules/tech/tech-log-changes/types/tech-log-changes.repository.interface';
import { InternalResponse, UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../../common/utils/di';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { EntityName } from '../../../common/types/entity.enum';

@Injectable()
export class TechLogChangesService implements ITechLogChangesService {
  constructor(
    @Inject(KFI.TECH_LOG_CHANGES_REPOSITORY)
    private readonly techLogChangesRepository: ITechLogChangesRepository,
  ) {}

  async getByUuid(techLogChangesUuid: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<TechLogChangesEntity>> {
    const concreteTechLogChanges = await this.techLogChangesRepository.getByUuid(techLogChangesUuid);
    return new InternalResponse(concreteTechLogChanges);
  }

  async getAll(queryParams: IQueryParams): Promise<UniversalInternalResponse<TechLogChangesEntity[]>> {
    const { skip, take } = queryParams || {};
    const allTechLogChanges = await this.techLogChangesRepository.getAll(skip, take);
    return new InternalResponse(allTechLogChanges);
  }

  async getAllFromEntity(
    EntityNameToSearch: EntityName,
    queryParams: IQueryParams,
  ): Promise<UniversalInternalResponse<TechLogChangesEntity[]>> {
    const { skip, take } = queryParams || {};
    const allTechLogChanges = await this.techLogChangesRepository.getAllFromEntity(EntityNameToSearch, skip, take);
    return new InternalResponse(allTechLogChanges);
  }

  async create(
    EntityNameToCreate: EntityName,
    dto: TechLogChangesCreateRequestDto,
  ): Promise<UniversalInternalResponse<TechLogChangesEntity>> {
    const createdMaterial = await this.techLogChangesRepository.create(EntityNameToCreate, dto);
    return new InternalResponse(createdMaterial);
  }
}
