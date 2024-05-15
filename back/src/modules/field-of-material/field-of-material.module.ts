import { Module } from '@nestjs/common';
import { KFI } from '../../common/utils/di';
import { FieldOfMaterialService } from './field-of-material.service';
import { FieldOfMaterialRepository } from './field-of-material.repository';
import { FieldOfMaterialController } from './field-of-material.controller';

@Module({
  providers: [
    {
      provide: KFI.FIELD_OF_MATERIAL_REPOSITORY,
      useClass: FieldOfMaterialRepository,
    },
    {
      provide: KFI.FIELD_OF_MATERIAL_SERVICE,
      useClass: FieldOfMaterialService,
    },
  ],
  controllers: [FieldOfMaterialController],
  imports: [],
  exports: [KFI.FIELD_OF_MATERIAL_SERVICE],
})
export class FieldOfMaterialModule {}
