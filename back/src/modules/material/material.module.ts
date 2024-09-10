import { forwardRef, Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { KFI } from '../../common/utils/di';
import { MaterialRepository } from './material.repository';
import { PriceChangingModule } from '../price-changing/price-changing.module';
import { CharacteristicsMaterialModule } from '../../modules/characteristics-material/characteristics-material.module';
import { FieldOfCategoryMaterialModule } from '../../modules/field-of-category-material/field-of-category-material.module';

@Module({
  providers: [
    {
      provide: KFI.MATERIAL_REPOSITORY,
      useClass: MaterialRepository,
    },
    {
      provide: KFI.MATERIAL_SERVICE,
      useClass: MaterialService,
    },
  ],
  controllers: [MaterialController],
  imports: [PriceChangingModule, forwardRef(() => CharacteristicsMaterialModule), forwardRef(() => FieldOfCategoryMaterialModule)],
  exports: [KFI.MATERIAL_SERVICE],
})
export class MaterialModule {}
