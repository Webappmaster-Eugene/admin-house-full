import { Module } from '@nestjs/common';
import { FieldUnitMeasurementService } from './field-unit-measurement.service';
import { FieldUnitMeasurementController } from './field-unit-measurement.controller';
import { KFI } from '../../common/utils/di';
import { FieldUnitMeasurementRepository } from './field-unit-measurement.repository';

@Module({
  providers: [
    {
      provide: KFI.FIELD_UNIT_MEASUREMENT_REPOSITORY,
      useClass: FieldUnitMeasurementRepository,
    },
    {
      provide: KFI.FIELD_UNIT_MEASUREMENT_SERVICE,
      useClass: FieldUnitMeasurementService,
    },
  ],
  controllers: [FieldUnitMeasurementController],
  imports: [],
  exports: [KFI.FIELD_UNIT_MEASUREMENT_SERVICE],
})
export class FieldUnitMeasurementModule {}
