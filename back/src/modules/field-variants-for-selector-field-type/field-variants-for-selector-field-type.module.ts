import { Logger, Module } from '@nestjs/common';
import { FieldVariantsForSelectorFieldTypeService } from './field-variants-for-selector-field-type.service';
import { FieldVariantsForSelectorFieldTypeController } from './field-variants-for-selector-field-type.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { FieldVariantsForSelectorFieldTypeRepository } from './field-variants-for-selector-field-type.repository';
import { PrismaService } from '../common/prisma/prisma.service';

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
      provide:
        KEYS_FOR_INJECTION.I_FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_REPOSITORY,
      useClass: FieldVariantsForSelectorFieldTypeRepository,
    },
    {
      provide:
        KEYS_FOR_INJECTION.I_FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_SERVICE,
      useClass: FieldVariantsForSelectorFieldTypeService,
    },
  ],
  controllers: [FieldVariantsForSelectorFieldTypeController],
  imports: [],
  exports: [
    KEYS_FOR_INJECTION.I_FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_SERVICE,
  ],
})
export class FieldVariantsForSelectorFieldTypeModule {}
