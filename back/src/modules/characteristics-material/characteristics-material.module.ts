import { forwardRef, Module } from '@nestjs/common';
import { KFI } from '../../common/utils/di';
import { CharacteristicsMaterialService } from './characteristics-material.service';
import { CharacteristicsMaterialRepository } from './characteristics-material.repository';
import { CharacteristicsMaterialController } from './characteristics-material.controller';
import { FieldOfCategoryMaterialModule } from '../../modules/field-of-category-material/field-of-category-material.module';
import { MaterialModule } from '../../modules/material/material.module';

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
  imports: [forwardRef(() => MaterialModule), FieldOfCategoryMaterialModule],
  exports: [KFI.CHARACTERISTICS_MATERIAL_SERVICE],
})
export class CharacteristicsMaterialModule {}
