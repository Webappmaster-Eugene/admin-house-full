import { Logger, Module } from '@nestjs/common';
import { FieldUnitMeasurementService } from './field-unit-measurement.service';
import { FieldUnitMeasurementController } from './field-unit-measurement.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { FieldUnitMeasurementRepository } from './field-unit-measurement.repository';
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
      provide: KEYS_FOR_INJECTION.I_FIELD_UNIT_MEASUREMENT_REPOSITORY,
      useClass: FieldUnitMeasurementRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_FIELD_UNIT_MEASUREMENT_SERVICE,
      useClass: FieldUnitMeasurementService,
    },
  ],
  controllers: [FieldUnitMeasurementController],
  imports: [],
  exports: [KEYS_FOR_INJECTION.I_FIELD_UNIT_MEASUREMENT_SERVICE],
})
export class FieldUnitMeasurementModule {}
