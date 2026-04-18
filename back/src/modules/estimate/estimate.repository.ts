import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { EEstimateItemType, PieLayer, Prisma, UnitTemplateComponent } from '.prisma/client';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { KFI } from '../../common/utils/di';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { roundMoney } from '../../common/helpers/round-money.helper';
import { EstimateEntity, EstimateItemEntity, EstimateSectionEntity, EstimateSectionTreeNode } from './entities/estimate.entity';
import { ITEM_BREAKDOWN_INCLUDE, SECTION_TREE_INCLUDE } from './consts/prisma-includes.const';
import { EstimateCreateRequestDto } from './dto/controller/estimate-create.dto';
import { EstimateUpdateRequestDto } from './dto/controller/estimate-update.dto';
import { EstimateSectionCreateRequestDto } from './dto/controller/section-create.dto';
import { EstimateSectionUpdateRequestDto } from './dto/controller/section-update.dto';
import { EstimateItemCreateRequestDto } from './dto/controller/item-create.dto';
import { EstimateItemUpdateRequestDto } from './dto/controller/item-update.dto';

type SectionWithChildren = Prisma.EstimateSectionGetPayload<{
  include: {
    items: { include: { components: true; pieLayers: true } };
    childSections: {
      include: {
        items: { include: { components: true; pieLayers: true } };
        childSections: {
          include: { items: { include: { components: true; pieLayers: true } } };
        };
      };
    };
  };
}>;

@Injectable()
export class EstimateRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly prisma: IPrismaService,
  ) {}

  // ========================= Estimate =========================

  async getAllByProject(projectUuid: EntityUrlParamCommand.RequestUuidParam): Promise<EstimateEntity[]> {
    try {
      const rows = await this.prisma.estimate.findMany({
        where: { projectUuid },
        orderBy: { createdAt: 'desc' },
      });
      return rows.map(row => new EstimateEntity(row));
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async getById(estimateId: EntityUrlParamCommand.RequestUuidParam): Promise<EstimateEntity> {
    try {
      const row = await this.prisma.estimate.findUnique({
        where: { uuid: estimateId },
        include: {
          sections: {
            orderBy: { orderIndex: 'asc' },
            include: SECTION_TREE_INCLUDE,
          },
        },
      });
      if (!row) {
        throw new NotFoundException(`Estimate with uuid ${estimateId} not found`);
      }
      const rootSections = row.sections.filter(s => !s.parentSectionUuid).map(s => this.buildSectionTree(s as SectionWithChildren));
      return new EstimateEntity({ ...row, sections: rootSections });
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  private buildSectionTree(section: SectionWithChildren): EstimateSectionTreeNode {
    const node = new EstimateSectionEntity(section) as EstimateSectionTreeNode;
    node.items = (section.items ?? []).map(i => new EstimateItemEntity(i));
    node.childSections = (section.childSections ?? []).map(child => this.buildSectionTree(child as SectionWithChildren));
    return node;
  }

  async create(
    dto: EstimateCreateRequestDto,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<EstimateEntity> {
    try {
      const created = await this.prisma.estimate.create({
        data: {
          name: dto.name,
          description: dto.description ?? null,
          defaultMarkupPercent: dto.defaultMarkupPercent ?? 0,
          projectUuid,
          lastChangeByUserUuid: userUuid,
        },
      });
      return new EstimateEntity(created);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    dto: EstimateUpdateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<EstimateEntity> {
    try {
      const updated = await this.prisma.estimate.update({
        where: { uuid: estimateId },
        data: {
          name: dto.name ?? undefined,
          description: dto.description ?? undefined,
          defaultMarkupPercent: dto.defaultMarkupPercent ?? undefined,
          estimateStatus: dto.estimateStatus ?? undefined,
          lastChangeByUserUuid: userUuid,
        },
      });
      return new EstimateEntity(updated);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(estimateId: EntityUrlParamCommand.RequestUuidParam): Promise<EstimateEntity> {
    try {
      const deleted = await this.prisma.estimate.delete({ where: { uuid: estimateId } });
      return new EstimateEntity(deleted);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  // ========================= Sections =========================

  async createSection(
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    dto: EstimateSectionCreateRequestDto,
  ): Promise<EstimateSectionEntity> {
    try {
      if (dto.parentSectionUuid) {
        const parent = await this.prisma.estimateSection.findUnique({ where: { uuid: dto.parentSectionUuid } });
        if (!parent || parent.estimateUuid !== estimateId) {
          throw new BadRequestException('Родительский раздел не принадлежит этой смете');
        }
        if (parent.parentSectionUuid) {
          throw new BadRequestException('Поддерживается только 2 уровня иерархии (раздел → подраздел)');
        }
      }
      const created = await this.prisma.estimateSection.create({
        data: {
          estimateUuid: estimateId,
          parentSectionUuid: dto.parentSectionUuid ?? null,
          name: dto.name,
          orderIndex: dto.orderIndex,
        },
      });
      return new EstimateSectionEntity(created);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async updateSectionById(
    sectionId: EntityUrlParamCommand.RequestUuidParam,
    dto: EstimateSectionUpdateRequestDto,
  ): Promise<EstimateSectionEntity> {
    try {
      const updated = await this.prisma.estimateSection.update({
        where: { uuid: sectionId },
        data: {
          name: dto.name ?? undefined,
          orderIndex: dto.orderIndex ?? undefined,
          parentSectionUuid: dto.parentSectionUuid ?? undefined,
        },
      });
      return new EstimateSectionEntity(updated);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async deleteSectionById(sectionId: EntityUrlParamCommand.RequestUuidParam): Promise<EstimateSectionEntity> {
    try {
      const deleted = await this.prisma.estimateSection.delete({ where: { uuid: sectionId } });
      return new EstimateSectionEntity(deleted);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async getSectionById(sectionId: EntityUrlParamCommand.RequestUuidParam): Promise<EstimateSectionEntity> {
    const row = await this.prisma.estimateSection.findUnique({ where: { uuid: sectionId } });
    if (!row) throw new NotFoundException(`EstimateSection ${sectionId} not found`);
    return new EstimateSectionEntity(row);
  }

  // ========================= Cross-entity ownership checks =========================

  async verifyProjectInWorkspace(
    projectId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<boolean> {
    const project = await this.prisma.project.findFirst({
      where: { uuid: projectId, organization: { workspaceUuid: workspaceId } },
      select: { uuid: true },
    });
    return Boolean(project);
  }

  async verifyEstimateInProject(
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    projectId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<boolean> {
    const estimate = await this.prisma.estimate.findFirst({
      where: { uuid: estimateId, projectUuid: projectId },
      select: { uuid: true },
    });
    return Boolean(estimate);
  }

  // ========================= Items =========================

  async createItem(sectionId: EntityUrlParamCommand.RequestUuidParam, dto: EstimateItemCreateRequestDto): Promise<EstimateItemEntity> {
    try {
      if (dto.unitTemplateUuid && dto.constructionPieUuid) {
        throw new BadRequestException('Строка не может одновременно ссылаться и на единичку, и на пирог');
      }

      // Если указан unitTemplateUuid — денормализуем из шаблона: имя, ед.изм., unitCost, компоненты.
      let name = dto.name;
      let unitMeasurement = dto.unitMeasurement;
      let unitCost = dto.unitCost;
      let markup = dto.markupPercent;
      let itemType = dto.itemType as EEstimateItemType;
      let templateComponents: UnitTemplateComponent[] = [];
      let pieLayers: PieLayer[] = [];

      if (dto.unitTemplateUuid) {
        const template = await this.prisma.unitTemplate.findUnique({
          where: { uuid: dto.unitTemplateUuid },
          include: { components: { orderBy: { orderIndex: 'asc' } } },
        });
        if (!template) {
          throw new NotFoundException(`UnitTemplate ${dto.unitTemplateUuid} not found`);
        }
        name = name ?? template.name;
        unitMeasurement = unitMeasurement ?? template.unitMeasurement;
        unitCost = unitCost ?? template.unitCost;
        markup = markup ?? template.defaultMarkupPercent;
        itemType = EEstimateItemType.UNIT;
        templateComponents = template.components;
      }

      if (dto.constructionPieUuid) {
        const pie = await this.prisma.constructionPie.findUnique({
          where: { uuid: dto.constructionPieUuid },
          include: { layers: { orderBy: { orderIndex: 'asc' } } },
        });
        if (!pie) {
          throw new NotFoundException(`ConstructionPie ${dto.constructionPieUuid} not found`);
        }
        name = name ?? pie.name;
        unitMeasurement = unitMeasurement ?? pie.unitMeasurement;
        unitCost = unitCost ?? pie.unitCost;
        markup = markup ?? pie.defaultMarkupPercent;
        itemType = EEstimateItemType.PIE;
        pieLayers = pie.layers;
      }

      if (name === undefined || unitMeasurement === undefined || unitCost === undefined) {
        throw new BadRequestException('Для обычной строки обязательны name, unitMeasurement, unitCost');
      }
      const markupValue = markup ?? 0;
      const unitClientPrice = roundMoney(unitCost * (1 + markupValue / 100));
      const totalCost = roundMoney(dto.quantity * unitCost);
      const totalClientPrice = roundMoney(dto.quantity * unitClientPrice);

      const created = await this.prisma.estimateItem.create({
        data: {
          sectionUuid: sectionId,
          orderIndex: dto.orderIndex,
          itemType,
          materialUuid: dto.materialUuid ?? null,
          unitTemplateUuid: dto.unitTemplateUuid ?? null,
          constructionPieUuid: dto.constructionPieUuid ?? null,
          name,
          unitMeasurement,
          quantity: dto.quantity,
          unitCost,
          markupPercent: markupValue,
          unitClientPrice,
          totalCost,
          totalClientPrice,
          comment: dto.comment ?? null,
          components: {
            create: templateComponents.map(component => ({
              orderIndex: component.orderIndex,
              itemType: component.itemType,
              materialUuid: component.materialUuid,
              name: component.name,
              unitMeasurement: component.unitMeasurement,
              quantityPerUnit: component.quantityPerUnit,
              unitCost: component.unitCost,
              totalCost: roundMoney(component.quantityPerUnit * dto.quantity * component.unitCost),
              comment: component.comment,
            })),
          },
          pieLayers: {
            create: pieLayers.map(layer => ({
              orderIndex: layer.orderIndex,
              materialUuid: layer.materialUuid,
              name: layer.name,
              thickness: layer.thickness,
              density: layer.density,
              consumptionPerM2: layer.consumptionPerM2,
              unitMeasurement: layer.unitMeasurement,
              unitCost: layer.unitCost,
              totalCost: roundMoney(layer.consumptionPerM2 * dto.quantity * layer.unitCost),
              comment: layer.comment,
            })),
          },
        },
        include: ITEM_BREAKDOWN_INCLUDE,
      });
      return new EstimateItemEntity(created);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async updateItemById(itemId: EntityUrlParamCommand.RequestUuidParam, dto: EstimateItemUpdateRequestDto): Promise<EstimateItemEntity> {
    try {
      const existing = await this.prisma.estimateItem.findUnique({
        where: { uuid: itemId },
        include: { components: true, pieLayers: true },
      });
      if (!existing) throw new NotFoundException(`EstimateItem ${itemId} not found`);

      const quantity = dto.quantity ?? existing.quantity;
      const unitCost = dto.unitCost ?? existing.unitCost;
      const markupPercent = dto.markupPercent ?? existing.markupPercent;
      const unitClientPrice = roundMoney(unitCost * (1 + markupPercent / 100));
      const totalCost = roundMoney(quantity * unitCost);
      const totalClientPrice = roundMoney(quantity * unitClientPrice);

      // Если у строки есть компоненты/слои и изменилось quantity — пересчитать totalCost каждого.
      const quantityChanged = dto.quantity !== undefined && dto.quantity !== existing.quantity;

      const updated = await this.prisma.$transaction(async tx => {
        const itemUpdate = await tx.estimateItem.update({
          where: { uuid: itemId },
          data: {
            orderIndex: dto.orderIndex ?? undefined,
            itemType: (dto.itemType as EEstimateItemType) ?? undefined,
            materialUuid: dto.materialUuid === undefined ? undefined : dto.materialUuid,
            name: dto.name ?? undefined,
            unitMeasurement: dto.unitMeasurement ?? undefined,
            quantity,
            unitCost,
            markupPercent,
            unitClientPrice,
            totalCost,
            totalClientPrice,
            comment: dto.comment === undefined ? undefined : dto.comment,
          },
          include: ITEM_BREAKDOWN_INCLUDE,
        });

        if (quantityChanged && existing.components.length > 0) {
          await Promise.all(
            existing.components.map(component =>
              tx.estimateItemComponent.update({
                where: { uuid: component.uuid },
                data: { totalCost: roundMoney(component.quantityPerUnit * quantity * component.unitCost) },
              }),
            ),
          );
        }

        if (quantityChanged && existing.pieLayers.length > 0) {
          await Promise.all(
            existing.pieLayers.map(layer =>
              tx.estimateItemPieLayer.update({
                where: { uuid: layer.uuid },
                data: { totalCost: roundMoney(layer.consumptionPerM2 * quantity * layer.unitCost) },
              }),
            ),
          );
        }

        const refreshed = await tx.estimateItem.findUnique({
          where: { uuid: itemId },
          include: ITEM_BREAKDOWN_INCLUDE,
        });
        return refreshed ?? itemUpdate;
      });

      return new EstimateItemEntity(updated);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async deleteItemById(itemId: EntityUrlParamCommand.RequestUuidParam): Promise<EstimateItemEntity> {
    try {
      const deleted = await this.prisma.estimateItem.delete({ where: { uuid: itemId } });
      return new EstimateItemEntity(deleted);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async getItemById(itemId: EntityUrlParamCommand.RequestUuidParam): Promise<EstimateItemEntity> {
    const row = await this.prisma.estimateItem.findUnique({ where: { uuid: itemId } });
    if (!row) throw new NotFoundException(`EstimateItem ${itemId} not found`);
    return new EstimateItemEntity(row);
  }

  // ========================= Totals recalculation =========================

  async recalculateTotals(estimateId: EntityUrlParamCommand.RequestUuidParam): Promise<void> {
    try {
      await this.prisma.$transaction(async tx => {
        const sections = await tx.estimateSection.findMany({
          where: { estimateUuid: estimateId },
          include: { items: true },
        });
        const sectionMap = new Map<string, (typeof sections)[number] & { childUuids: string[] }>();
        for (const s of sections) {
          sectionMap.set(s.uuid, { ...s, childUuids: [] });
        }
        for (const s of sections) {
          if (s.parentSectionUuid && sectionMap.has(s.parentSectionUuid)) {
            sectionMap.get(s.parentSectionUuid)!.childUuids.push(s.uuid);
          }
        }
        const totals = new Map<string, { cost: number; clientPrice: number }>();
        const compute = (uuid: string): { cost: number; clientPrice: number } => {
          if (totals.has(uuid)) return totals.get(uuid)!;
          const node = sectionMap.get(uuid)!;
          let cost = 0;
          let clientPrice = 0;
          for (const item of node.items) {
            cost += item.totalCost;
            clientPrice += item.totalClientPrice;
          }
          for (const childUuid of node.childUuids) {
            const child = compute(childUuid);
            cost += child.cost;
            clientPrice += child.clientPrice;
          }
          const rounded = { cost: roundMoney(cost), clientPrice: roundMoney(clientPrice) };
          totals.set(uuid, rounded);
          return rounded;
        };

        for (const s of sections) compute(s.uuid);

        for (const [uuid, totalsRow] of totals.entries()) {
          await tx.estimateSection.update({
            where: { uuid },
            data: {
              sectionTotalCost: totalsRow.cost,
              sectionTotalClientPrice: totalsRow.clientPrice,
            },
          });
        }

        let estimateTotalCost = 0;
        let estimateTotalClientPrice = 0;
        for (const s of sections) {
          if (!s.parentSectionUuid) {
            const t = totals.get(s.uuid)!;
            estimateTotalCost += t.cost;
            estimateTotalClientPrice += t.clientPrice;
          }
        }
        await tx.estimate.update({
          where: { uuid: estimateId },
          data: {
            totalCost: roundMoney(estimateTotalCost),
            totalClientPrice: roundMoney(estimateTotalClientPrice),
          },
        });
      });
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }
}
