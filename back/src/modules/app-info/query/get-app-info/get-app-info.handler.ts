import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAppInfoQuery } from './get-app-info.query';
import { IAppInfoRepository } from '../../types/app-info.repository.interface';
import { Inject } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../../../common/utils/di';
import { AppInfoEntity } from '../../entities/app-info.entity';

@QueryHandler(GetAppInfoQuery)
export class GetAppInfoHandler implements IQueryHandler<GetAppInfoQuery> {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_APP_INFO_REPOSITORY)
    private readonly appInfoRepository: IAppInfoRepository,
  ) {}
  async execute({}: GetAppInfoQuery): Promise<AppInfoEntity> {
    const appInfo = await this.appInfoRepository.get();
    return appInfo;
  }
}
