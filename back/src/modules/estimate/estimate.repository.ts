import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { EEstimateItemType, Prisma } from '.prisma/client';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { KFI } from '../../common/utils/di';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { EstimateEntity, EstimateItemEntity, EstimateSectionEntity, EstimateSectionTreeNode } from './entities/estimate.entity';
import { EstimateCreateRequestDto } from './dto/controller/estimate-create.dto';
import { EstimateUpdateRequestDto } from './dto/controller/estimate-update.dto';
import { EstimateSectionCreateRequestDto } from './dto/controller/section-create.dto';
import { EstimateSectionUpdateRequestDto } from './dto/controller/section-update.dto';
import { EstimateItemCreateRequestDto } from './dto/controller/item-create.dto';
import { EstimateItemUpdateRequestDto } from './dto/controller/item-update.dto';

type SectionWithChildren = Prisma.EstimateSectionGetPayload<{
  include: { items: true; childSections: { include: { items: true; childSections: { include: { items: true } } } } };
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
            include: {
              items: { orderBy: { orderIndex: 'asc' } },
              childSections: {
                orderBy: { orderIndex: 'asc' },
                include: {
                  items: { orderBy: { orderIndex: 'asc' } },
                  childSections: {
                    orderBy: { orderIndex: 'asc' },
                    include: { items: { orderBy: { orderIndex: 'asc' } } },
                  },
                },
              },
            },
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
      const markup = dto.markupPercent ?? 0;
      const unitClientPrice = roundMoney(dto.unitCost * (1 + markup / 100));
      const totalCost = roundMoney(dto.quantity * dto.unitCost);
      const totalClientPrice = roundMoney(dto.quantity * unitClientPrice);

      const created = await this.prisma.estimateItem.create({
        data: {
          sectionUuid: sectionId,
          orderIndex: dto.orderIndex,
          itemType: dto.itemType as EEstimateItemType,
          materialUuid: dto.materialUuid ?? null,
          name: dto.name,
          unitMeasurement: dto.unitMeasurement,
          quantity: dto.quantity,
          unitCost: dto.unitCost,
          markupPercent: markup,
          unitClientPrice,
          totalCost,
          totalClientPrice,
          comment: dto.comment ?? null,
        },
      });
      return new EstimateItemEntity(created);
    } catch (error) {
      errorRepositoryHandler(error);
    }
  }

  async updateItemById(itemId: EntityUrlParamCommand.RequestUuidParam, dto: EstimateItemUpdateRequestDto): Promise<EstimateItemEntity> {
    try {
      const existing = await this.prisma.estimateItem.findUnique({ where: { uuid: itemId } });
      if (!existing) throw new NotFoundException(`EstimateItem ${itemId} not found`);

      const quantity = dto.quantity ?? existing.quantity;
      const unitCost = dto.unitCost ?? existing.unitCost;
      const markupPercent = dto.markupPercent ?? existing.markupPercent;
      const unitClientPrice = roundMoney(unitCost * (1 + markupPercent / 100));
      const totalCost = roundMoney(quantity * unitCost);
      const totalClientPrice = roundMoney(quantity * unitClientPrice);

      const updated = await this.prisma.estimateItem.update({
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

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}
