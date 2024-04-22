import { Logger, Module } from '@nestjs/common';
import { TypeFieldService } from './type-field.service';
import { TypeFieldController } from './type-field.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { TypeFieldRepository } from './type-field.repository';
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
      provide: KEYS_FOR_INJECTION.I_HANDBOOK_REPOSITORY,
      useClass: TypeFieldRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_HANDBOOK_SERVICE,
      useClass: TypeFieldService,
    },
  ],
  controllers: [TypeFieldController],
  imports: [],
  exports: [KEYS_FOR_INJECTION.I_HANDBOOK_SERVICE],
})
export class TypeFieldModule {}
