import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ESLint } from 'eslint';
import { ConfigService } from '@nestjs/config';

/**
 * Extension of the PrismaClient for use with NestJs.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    super({
      /**
       * Get the database url from environmental variables and pass it in.
       */
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  /**
   * Connect to the database when the module is initialized.
   */
  async onModuleInit() {
    this.$connect();
  }

  /**
   * Disconnect from the database when the application is shutting down.
   */
  async onModuleDestroy() {
    this.$disconnect();
  }

  /**
   * A utility function used to clear all database rows for testing.
   */
  clearDatabase() {
    const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

    return Promise.all(
      modelNames.map((modelName) =>
        this[modelName[0].toLowerCase() + modelName.slice(1)].deleteMany(),
      ),
    );
  }
}
