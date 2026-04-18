import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { KFI } from '../../common/utils/di';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { roundMoney } from '../../common/helpers/round-money.helper';
import { ConstructionPieEntity, PieLayerEntity } from './entities/construction-pie.entity';
import { ConstructionPieCreateRequestDto } from './dto/controller/pie-create.dto';
import { ConstructionPieUpdateRequestDto } from './dto/controller/pie-update.dto';
import { PieLayerCreateRequestDto } from './dto/controller/layer-create.dto';
import { PieLayerUpdateRequestDto } from './dto/controller/layer-update.dto';

@Injectable()
export class ConstructionPieRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly prisma: IPrismaService,
  ) {}

  async getAllInHandbook(handbookUuid: EntityUrlParamCommand.RequestUuidParam): Promise<ConstructionPieEntity[]> {
    try {
      const rows = await this.prisma.constructionPie.findMany({
        where: { handbookUuid },
        orderBy: { createdAt: 'desc' },
        include: { layers: { orderBy: { orderIndex: 'asc' } } },
      });
      return rows.map(
        row =>
          new ConstructionPieEntity({
            ...row,
            layers: row.layers.map(l => new PieLayerEntity(l)),
          }),
      );
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async getById(pieUuid: EntityUrlParamCommand.RequestUuidParam): Promise<ConstructionPieEntity> {
    try {
      const row = await this.prisma.constructionPie.findUnique({
        where: { uuid: pieUuid },
        include: { layers: { orderBy: { orderIndex: 'asc' } } },
      });
      if (!row) throw new NotFoundException(`ConstructionPie ${pieUuid} not found`);
      return new ConstructionPieEntity({
        ...row,
        layers: row.layers.map(l => new PieLayerEntity(l)),
      });
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: ConstructionPieCreateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ConstructionPieEntity> {
    try {
      const created = await this.prisma.constructionPie.create({
        data: {
          name: dto.name,
          description: dto.description ?? null,
          unitMeasurement: dto.unitMeasurement ?? 'м²',
          defaultMarkupPercent: dto.defaultMarkupPercent ?? 0,
          handbookUuid,
          lastChangeByUserUuid: userUuid,
        },
      });
      return new ConstructionPieEntity(created);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: ConstructionPieUpdateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ConstructionPieEntity> {
    try {
      const updated = await this.prisma.constructionPie.update({
        where: { uuid: pieUuid },
        data: {
          name: dto.name ?? undefined,
          description: dto.description ?? undefined,
          unitMeasurement: dto.unitMeasurement ?? undefined,
          defaultMarkupPercent: dto.defaultMarkupPercent ?? undefined,
          lastChangeByUserUuid: userUuid,
        },
      });
      return new ConstructionPieEntity(updated);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(pieUuid: EntityUrlParamCommand.RequestUuidParam): Promise<ConstructionPieEntity> {
    try {
      const deleted = await this.prisma.constructionPie.delete({ where: { uuid: pieUuid } });
      return new ConstructionPieEntity(deleted);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async createLayer(pieUuid: EntityUrlParamCommand.RequestUuidParam, dto: PieLayerCreateRequestDto): Promise<PieLayerEntity> {
    try {
      const created = await this.prisma.pieLayer.create({
        data: {
          constructionPieUuid: pieUuid,
          orderIndex: dto.orderIndex,
          materialUuid: dto.materialUuid ?? null,
          name: dto.name,
          thickness: dto.thickness,
          density: dto.density ?? 0,
          consumptionPerM2: dto.consumptionPerM2,
          unitMeasurement: dto.unitMeasurement,
          unitCost: dto.unitCost,
          comment: dto.comment ?? null,
        },
      });
      return new PieLayerEntity(created);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async updateLayerById(layerUuid: EntityUrlParamCommand.RequestUuidParam, dto: PieLayerUpdateRequestDto): Promise<PieLayerEntity> {
    try {
      const updated = await this.prisma.pieLayer.update({
        where: { uuid: layerUuid },
        data: {
          orderIndex: dto.orderIndex ?? undefined,
          materialUuid: dto.materialUuid === undefined ? undefined : dto.materialUuid,
          name: dto.name ?? undefined,
          thickness: dto.thickness ?? undefined,
          density: dto.density ?? undefined,
          consumptionPerM2: dto.consumptionPerM2 ?? undefined,
          unitMeasurement: dto.unitMeasurement ?? undefined,
          unitCost: dto.unitCost ?? undefined,
          comment: dto.comment === undefined ? undefined : dto.comment,
        },
      });
      return new PieLayerEntity(updated);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async deleteLayerById(layerUuid: EntityUrlParamCommand.RequestUuidParam): Promise<PieLayerEntity> {
    try {
      const deleted = await this.prisma.pieLayer.delete({ where: { uuid: layerUuid } });
      return new PieLayerEntity(deleted);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async getLayerById(layerUuid: EntityUrlParamCommand.RequestUuidParam): Promise<PieLayerEntity> {
    const row = await this.prisma.pieLayer.findUnique({ where: { uuid: layerUuid } });
    if (!row) throw new NotFoundException(`PieLayer ${layerUuid} not found`);
    return new PieLayerEntity(row);
  }

  async recalculatePieAggregates(pieUuid: EntityUrlParamCommand.RequestUuidParam): Promise<void> {
    try {
      await this.prisma.$transaction(async tx => {
        const pie = await tx.constructionPie.findUnique({ where: { uuid: pieUuid } });
        if (!pie) return;
        const layers = await tx.pieLayer.findMany({ where: { constructionPieUuid: pieUuid } });
        const unitCost = layers.reduce((acc, l) => acc + l.consumptionPerM2 * l.unitCost, 0);
        const totalThickness = layers.reduce((acc, l) => acc + l.thickness, 0);
        const unitClientPrice = unitCost * (1 + pie.defaultMarkupPercent / 100);
        await tx.constructionPie.update({
          where: { uuid: pieUuid },
          data: {
            unitCost: roundMoney(unitCost),
            unitClientPrice: roundMoney(unitClientPrice),
            totalThickness: roundMoney(totalThickness),
          },
        });
      });
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async verifyPieInHandbook(
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<boolean> {
    const row = await this.prisma.constructionPie.findFirst({
      where: { uuid: pieUuid, handbookUuid },
      select: { uuid: true },
    });
    return Boolean(row);
  }

  async verifyHandbookInWorkspace(
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<boolean> {
    const row = await this.prisma.handbook.findFirst({
      where: { uuid: handbookUuid, workspaceUuid },
      select: { uuid: true },
    });
    return Boolean(row);
  }
}
