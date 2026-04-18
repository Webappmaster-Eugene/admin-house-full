import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EEstimateItemType } from '.prisma/client';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { KFI } from '../../common/utils/di';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { roundMoney } from '../../common/helpers/round-money.helper';
import { UnitTemplateEntity, UnitTemplateComponentEntity } from './entities/unit-template.entity';
import { UnitTemplateCreateRequestDto } from './dto/controller/unit-template-create.dto';
import { UnitTemplateUpdateRequestDto } from './dto/controller/unit-template-update.dto';
import { UnitTemplateComponentCreateRequestDto } from './dto/controller/component-create.dto';
import { UnitTemplateComponentUpdateRequestDto } from './dto/controller/component-update.dto';

@Injectable()
export class UnitTemplateRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly prisma: IPrismaService,
  ) {}

  async getAllInHandbook(handbookUuid: EntityUrlParamCommand.RequestUuidParam): Promise<UnitTemplateEntity[]> {
    try {
      const rows = await this.prisma.unitTemplate.findMany({
        where: { handbookUuid },
        orderBy: { createdAt: 'desc' },
        include: { components: { orderBy: { orderIndex: 'asc' } } },
      });
      return rows.map(
        row =>
          new UnitTemplateEntity({
            ...row,
            components: row.components.map(c => new UnitTemplateComponentEntity(c)),
          }),
      );
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async getById(templateUuid: EntityUrlParamCommand.RequestUuidParam): Promise<UnitTemplateEntity> {
    try {
      const row = await this.prisma.unitTemplate.findUnique({
        where: { uuid: templateUuid },
        include: { components: { orderBy: { orderIndex: 'asc' } } },
      });
      if (!row) throw new NotFoundException(`UnitTemplate ${templateUuid} not found`);
      return new UnitTemplateEntity({
        ...row,
        components: row.components.map(c => new UnitTemplateComponentEntity(c)),
      });
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: UnitTemplateCreateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UnitTemplateEntity> {
    try {
      const created = await this.prisma.unitTemplate.create({
        data: {
          name: dto.name,
          description: dto.description ?? null,
          unitMeasurement: dto.unitMeasurement,
          defaultMarkupPercent: dto.defaultMarkupPercent ?? 0,
          handbookUuid,
          lastChangeByUserUuid: userUuid,
        },
      });
      return new UnitTemplateEntity(created);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: UnitTemplateUpdateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UnitTemplateEntity> {
    try {
      const updated = await this.prisma.unitTemplate.update({
        where: { uuid: templateUuid },
        data: {
          name: dto.name ?? undefined,
          description: dto.description ?? undefined,
          unitMeasurement: dto.unitMeasurement ?? undefined,
          defaultMarkupPercent: dto.defaultMarkupPercent ?? undefined,
          lastChangeByUserUuid: userUuid,
        },
      });
      return new UnitTemplateEntity(updated);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(templateUuid: EntityUrlParamCommand.RequestUuidParam): Promise<UnitTemplateEntity> {
    try {
      const deleted = await this.prisma.unitTemplate.delete({ where: { uuid: templateUuid } });
      return new UnitTemplateEntity(deleted);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async createComponent(
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: UnitTemplateComponentCreateRequestDto,
  ): Promise<UnitTemplateComponentEntity> {
    try {
      const created = await this.prisma.unitTemplateComponent.create({
        data: {
          unitTemplateUuid: templateUuid,
          orderIndex: dto.orderIndex,
          itemType: dto.itemType as EEstimateItemType,
          materialUuid: dto.materialUuid ?? null,
          name: dto.name,
          unitMeasurement: dto.unitMeasurement,
          quantityPerUnit: dto.quantityPerUnit,
          unitCost: dto.unitCost,
          comment: dto.comment ?? null,
        },
      });
      return new UnitTemplateComponentEntity(created);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async updateComponentById(
    componentUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: UnitTemplateComponentUpdateRequestDto,
  ): Promise<UnitTemplateComponentEntity> {
    try {
      const updated = await this.prisma.unitTemplateComponent.update({
        where: { uuid: componentUuid },
        data: {
          orderIndex: dto.orderIndex ?? undefined,
          itemType: (dto.itemType as EEstimateItemType) ?? undefined,
          materialUuid: dto.materialUuid === undefined ? undefined : dto.materialUuid,
          name: dto.name ?? undefined,
          unitMeasurement: dto.unitMeasurement ?? undefined,
          quantityPerUnit: dto.quantityPerUnit ?? undefined,
          unitCost: dto.unitCost ?? undefined,
          comment: dto.comment === undefined ? undefined : dto.comment,
        },
      });
      return new UnitTemplateComponentEntity(updated);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async deleteComponentById(componentUuid: EntityUrlParamCommand.RequestUuidParam): Promise<UnitTemplateComponentEntity> {
    try {
      const deleted = await this.prisma.unitTemplateComponent.delete({ where: { uuid: componentUuid } });
      return new UnitTemplateComponentEntity(deleted);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async getComponentById(componentUuid: EntityUrlParamCommand.RequestUuidParam): Promise<UnitTemplateComponentEntity> {
    const row = await this.prisma.unitTemplateComponent.findUnique({ where: { uuid: componentUuid } });
    if (!row) throw new NotFoundException(`UnitTemplateComponent ${componentUuid} not found`);
    return new UnitTemplateComponentEntity(row);
  }

  async recalculateTemplateAggregates(templateUuid: EntityUrlParamCommand.RequestUuidParam): Promise<void> {
    try {
      await this.prisma.$transaction(async tx => {
        const template = await tx.unitTemplate.findUnique({ where: { uuid: templateUuid } });
        if (!template) return;
        const components = await tx.unitTemplateComponent.findMany({ where: { unitTemplateUuid: templateUuid } });
        const unitCost = components.reduce((acc, c) => acc + c.quantityPerUnit * c.unitCost, 0);
        const unitClientPrice = unitCost * (1 + template.defaultMarkupPercent / 100);
        await tx.unitTemplate.update({
          where: { uuid: templateUuid },
          data: {
            unitCost: roundMoney(unitCost),
            unitClientPrice: roundMoney(unitClientPrice),
          },
        });
      });
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async verifyTemplateInHandbook(
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<boolean> {
    const row = await this.prisma.unitTemplate.findFirst({
      where: { uuid: templateUuid, handbookUuid },
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
