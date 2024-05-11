import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { KFI } from '../../common/utils/di';

@Module({
  providers: [
    {
      provide: KFI.ROLE_REPOSITORY,
      useClass: RolesRepository,
    },
    {
      provide: KFI.ROLE_SERVICE,
      useClass: RolesService,
    },
  ],
  imports: [],
  controllers: [RolesController],
  exports: [KFI.ROLE_SERVICE],
})
export class RolesModule {}
