import { Module } from '@nestjs/common';
import { KFI } from '../../common/utils/di';
import { FieldTypeService } from './field-type.service';
import { FieldTypeRepository } from './field-type.repository';
import { FieldTypeController } from './field-type.controller';

@Module({
  providers: [
    {
      provide: KFI.FIELD_TYPE_REPOSITORY,
      useClass: FieldTypeRepository,
    },
    {
      provide: KFI.FIELD_TYPE_SERVICE,
      useClass: FieldTypeService,
    },
  ],
  controllers: [FieldTypeController],
  imports: [],
  exports: [KFI.FIELD_TYPE_SERVICE],
})
export class FieldTypeModule {}
