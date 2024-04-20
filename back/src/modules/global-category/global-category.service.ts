import { Injectable } from '@nestjs/common';
import { GlobalCategoryEntity } from './entities/global-category.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { GlobalCategoryUpdateRequestDto } from './dto/controller/update-global-category.dto';
import { IGlobalCategoryService } from './types/global-category.service.interface';
import { GlobalCategoryCreateRequestDto } from './dto/controller/create-global-category.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteGlobalCategoryCommand } from './command/delete-global-category/delete-global-category.command';
import { UpdateGlobalCategoryCommand } from './command/update-global-category/update-global-category.command';
import { CreateGlobalCategoryCommand } from './command/create-global-category/create-global-category.command';
import { GetGlobalCategoryByIdQuery } from './query/get-global-category-by-id/get-global-category-by-id.query';
import { GetAllGlobalCategoriesQuery } from './query/get-all-global-categories/get-all-global-categories.query';

@Injectable()
export class GlobalCategoryService implements IGlobalCategoryService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getById(
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<GlobalCategoryEntity>> {
    const globalCategory: GlobalCategoryEntity = await this.queryBus.execute(
      new GetGlobalCategoryByIdQuery(globalCategoryId),
    );
    return new InternalResponse<GlobalCategoryEntity>(globalCategory);
  }

  async getAll(): Promise<UniversalInternalResponse<GlobalCategoryEntity[]>> {
    const globalCategories: GlobalCategoryEntity[] =
      await this.queryBus.execute(new GetAllGlobalCategoriesQuery());
    return new InternalResponse<GlobalCategoryEntity[]>(globalCategories);
  }

  // для создания GlobalCategory нужно указать id пользователя (менеджера), для которого создается GlobalCategory
  async create(
    dto: GlobalCategoryCreateRequestDto,
  ): Promise<UniversalInternalResponse<GlobalCategoryEntity>> {
    const createdGlobalCategory: GlobalCategoryEntity =
      await this.commandBus.execute<
        CreateGlobalCategoryCommand,
        GlobalCategoryEntity
      >(new CreateGlobalCategoryCommand(dto));

    return new InternalResponse<GlobalCategoryEntity>(createdGlobalCategory);
  }

  async updateById(
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryUpdateRequestDto,
  ): Promise<UniversalInternalResponse<GlobalCategoryEntity>> {
    const updatedGlobalCategory: GlobalCategoryEntity =
      await this.commandBus.execute<
        UpdateGlobalCategoryCommand,
        GlobalCategoryEntity
      >(new UpdateGlobalCategoryCommand(globalCategoryId, dto));

    return new InternalResponse<GlobalCategoryEntity>(updatedGlobalCategory);
  }

  async deleteById(
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<GlobalCategoryEntity>> {
    const deletedGlobalCategory: GlobalCategoryEntity =
      await this.commandBus.execute<
        DeleteGlobalCategoryCommand,
        GlobalCategoryEntity
      >(new DeleteGlobalCategoryCommand(globalCategoryId));

    return new InternalResponse<GlobalCategoryEntity>(deletedGlobalCategory);
  }
}
