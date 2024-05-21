import { Module } from '@nestjs/common';
import { KFI } from '../../common/utils/di';
import { CharacteristicsMaterialService } from './characteristics-material.service';
import { CharacteristicsMaterialRepository } from './characteristics-material.repository';
import { CharacteristicsMaterialController } from './characteristics-material.controller';

@Module({
  providers: [
    {
      provide: KFI.CHARACTERISTICS_MATERIAL_REPOSITORY,
      useClass: CharacteristicsMaterialRepository,
    },
    {
      provide: KFI.CHARACTERISTICS_MATERIAL_SERVICE,
      useClass: CharacteristicsMaterialService,
    },
  ],
  controllers: [CharacteristicsMaterialController],
  imports: [],
  exports: [KFI.CHARACTERISTICS_MATERIAL_SERVICE],
})
export class CharacteristicsMaterialModule {}
