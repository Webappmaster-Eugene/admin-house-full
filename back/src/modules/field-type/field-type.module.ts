import { Logger, Module } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { PrismaService } from '../common/prisma/prisma.service';
import { FieldVariantsForSelectorFieldTypeRepository } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type.repository';
import { FieldVariantsForSelectorFieldTypeService } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type.service';
import { FieldVariantsForSelectorFieldTypeController } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type.controller';

@Module({
  providers: [
    {
      provide: KEYS_FOR_INJECTION.I_PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: KEYS_FOR_INJECTION.I_LOGGER,
      useClass: Logger,
    },
    {
      provide: KEYS_FOR_INJECTION.I_FIELD_TYPE_REPOSITORY,
      useClass: FieldVariantsForSelectorFieldTypeRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_FIELD_TYPE_SERVICE,
      useClass: FieldVariantsForSelectorFieldTypeService,
    },
  ],
  controllers: [FieldVariantsForSelectorFieldTypeController],
  imports: [],
  exports: [KEYS_FOR_INJECTION.I_FIELD_TYPE_SERVICE],
})
export class TypeFieldModule {}
