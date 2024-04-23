import { Injectable } from '@nestjs/common';
import { GlobalCategoryMaterialEntity } from './entities/global-category-material.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { GlobalCategoryMaterialUpdateRequestDto } from './dto/controller/update-global-category-material.dto';
import { IGlobalCategoryMaterialService } from './types/global-category-material.service.interface';
import { GlobalCategoryMaterialCreateRequestDto } from './dto/controller/create-global-category-material.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteGlobalCategoryMaterialCommand } from './command/delete-global-category-material/delete-global-category-material.command';
import { UpdateGlobalCategoryMaterialCommand } from './command/update-global-category-material/update-global-category-material.command';
import { CreateGlobalCategoryMaterialCommand } from './command/create-global-category-material/create-global-category-material.command';
import { GetAllGlobalCategoryMaterialsQuery } from './query/get-all-global-category-materials/get-all-global-category-materials.query';
import { GetGlobalCategoryMaterialByIdQuery } from './query/get-global-category-material-by-id/get-global-category-material-by-id.query';

@Injectable()
export class GlobalCategoryMaterialService
  implements IGlobalCategoryMaterialService
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getById(
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<GlobalCategoryMaterialEntity>> {
    const globalCategoryMaterial: GlobalCategoryMaterialEntity =
      await this.queryBus.execute(
        new GetGlobalCategoryMaterialByIdQuery(globalCategoryMaterialId),
      );
    return new InternalResponse<GlobalCategoryMaterialEntity>(
      globalCategoryMaterial,
    );
  }

  async getAll(): Promise<
    UniversalInternalResponse<GlobalCategoryMaterialEntity[]>
  > {
    const globalCategoryMaterials: GlobalCategoryMaterialEntity[] =
      await this.queryBus.execute(new GetAllGlobalCategoryMaterialsQuery());
    return new InternalResponse<GlobalCategoryMaterialEntity[]>(
      globalCategoryMaterials,
    );
  }

  // для создания GlobalCategory нужно указать id пользователя (менеджера), для которого создается GlobalCategory
  async create(
    dto: GlobalCategoryMaterialCreateRequestDto,
  ): Promise<UniversalInternalResponse<GlobalCategoryMaterialEntity>> {
    const createdGlobalCategoryMaterial: GlobalCategoryMaterialEntity =
      await this.commandBus.execute<
        CreateGlobalCategoryMaterialCommand,
        GlobalCategoryMaterialEntity
      >(new CreateGlobalCategoryMaterialCommand(dto));

    return new InternalResponse<GlobalCategoryMaterialEntity>(
      createdGlobalCategoryMaterial,
    );
  }

  async updateById(
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<GlobalCategoryMaterialEntity>> {
    const updatedGlobalCategoryMaterial: GlobalCategoryMaterialEntity =
      await this.commandBus.execute<
        UpdateGlobalCategoryMaterialCommand,
        GlobalCategoryMaterialEntity
      >(new UpdateGlobalCategoryMaterialCommand(globalCategoryMaterialId, dto));

    return new InternalResponse<GlobalCategoryMaterialEntity>(
      updatedGlobalCategoryMaterial,
    );
  }

  async deleteById(
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<GlobalCategoryMaterialEntity>> {
    const deletedGlobalCategoryMaterial: GlobalCategoryMaterialEntity =
      await this.commandBus.execute<
        DeleteGlobalCategoryMaterialCommand,
        GlobalCategoryMaterialEntity
      >(new DeleteGlobalCategoryMaterialCommand(globalCategoryMaterialId));

    return new InternalResponse<GlobalCategoryMaterialEntity>(
      deletedGlobalCategoryMaterial,
    );
  }
}
