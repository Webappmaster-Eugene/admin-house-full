import { Inject, Injectable } from '@nestjs/common';
import { MaterialCreateRequestDto } from './dto/controller/create-material.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IMaterialRepository } from './types/material.repository.interface';
import { MaterialUpdateRequestDto } from './dto/controller/update-material.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { MaterialEntity } from './entities/material.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/take-limit.handler';

@Injectable()
export class MaterialRepository implements IMaterialRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(materialId: EntityUrlParamCommand.RequestUuidParam): Promise<MaterialEntity> {
    try {
      const findedMaterial = await this.databaseService.material.findUnique({
        where: {
          uuid: materialId,
        },
      });

      return existenceEntityHandler(findedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<MaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allMaterials = await this.databaseService.material.findMany({ skip, take });
      return existenceEntityHandler(allMaterials, MaterialEntity, EntityName.MATERIAL) as MaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(dto: MaterialCreateRequestDto, managerId: EntityUrlParamCommand.RequestUuidParam): Promise<MaterialEntity> {
    try {
      const {} = dto;
      const newMaterial = await this.databaseService.material.create({
        data: {},
      });
      return existenceEntityHandler(newMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: MaterialUpdateRequestDto,
  ): Promise<MaterialEntity> {
    try {
      const updatedMaterial = await this.databaseService.material.update({
        where: {
          uuid: materialId,
        },
        data: {
          name,
          description,
        },
      });

      return existenceEntityHandler(updatedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(id: EntityUrlParamCommand.RequestUuidParam): Promise<MaterialEntity> {
    try {
      const deletedMaterial = await this.databaseService.material.delete({
        where: {
          uuid: id,
        },
      });

      return existenceEntityHandler(deletedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
