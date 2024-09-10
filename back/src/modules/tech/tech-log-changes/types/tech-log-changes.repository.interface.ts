import { EntityUrlParamCommand } from 'libs/contracts';
import { TechLogChangesEntity } from '../../../../modules/tech/tech-log-changes/entities/tech-log-changes.entity';
import { EntityName } from '../../../../common/types/entity.enum';

export interface ITechLogChangesRepository {
  getByUuid: (techLogChangesUuid: EntityUrlParamCommand.RequestUuidParam) => Promise<TechLogChangesEntity>;
  getAll: (skip?: number, take?: number) => Promise<TechLogChangesEntity[]>;
  getAllFromEntity: (EntityNameToSearch: EntityName, skip?: number, take?: number) => Promise<TechLogChangesEntity[]>;
  create: (EntityNameToCreate: EntityName, TechLogChangesCreateRequestDto) => Promise<TechLogChangesEntity>;
}
