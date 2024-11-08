import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAppInfoCommand } from './update-app-info.command';
import { Inject } from '@nestjs/common';
import { KFI } from '../../../../common/utils/di';
import { IAppInfoRepository } from '../../types/app-info.repository.interface';

@CommandHandler(UpdateAppInfoCommand)
export class UpdateAppInfoHandler implements ICommandHandler<UpdateAppInfoCommand> {
  constructor(
    @Inject(KFI.APP_INFO_REPOSITORY)
    private readonly appInfoRepository: IAppInfoRepository,
  ) {}

  async execute({ appInfoId, dto }: UpdateAppInfoCommand) {
    return this.appInfoRepository.update(appInfoId, dto);
  }
}
