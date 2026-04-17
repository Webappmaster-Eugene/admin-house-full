import { Inject, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { EstimateRepository } from './estimate.repository';
import { EstimateEntity, EstimateItemEntity, EstimateSectionEntity } from './entities/estimate.entity';
import { EstimateCreateRequestDto } from './dto/controller/estimate-create.dto';
import { EstimateUpdateRequestDto } from './dto/controller/estimate-update.dto';
import { EstimateSectionCreateRequestDto } from './dto/controller/section-create.dto';
import { EstimateSectionUpdateRequestDto } from './dto/controller/section-update.dto';
import { EstimateItemCreateRequestDto } from './dto/controller/item-create.dto';
import { EstimateItemUpdateRequestDto } from './dto/controller/item-update.dto';

@Injectable()
export class EstimateService {
  constructor(
    @Inject(KFI.ESTIMATE_REPOSITORY)
    private readonly repository: EstimateRepository,
  ) {}

  async getAllByProject(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<EstimateEntity[]>> {
    await this.assertProjectInWorkspace(workspaceId, projectUuid);
    const list = await this.repository.getAllByProject(projectUuid);
    return new InternalResponse(list);
  }

  async getById(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<EstimateEntity>> {
    await this.assertEstimateOwnership(workspaceId, projectUuid, estimateId);
    const estimate = await this.repository.getById(estimateId);
    return new InternalResponse(estimate);
  }

  async create(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: EstimateCreateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<EstimateEntity>> {
    await this.assertProjectInWorkspace(workspaceId, projectUuid);
    const created = await this.repository.create(dto, projectUuid, userUuid);
    return new InternalResponse(created);
  }

  async updateById(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    dto: EstimateUpdateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<EstimateEntity>> {
    await this.assertEstimateOwnership(workspaceId, projectUuid, estimateId);
    const updated = await this.repository.updateById(estimateId, dto, userUuid);
    return new InternalResponse(updated);
  }

  async deleteById(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<EstimateEntity>> {
    await this.assertEstimateOwnership(workspaceId, projectUuid, estimateId);
    const deleted = await this.repository.deleteById(estimateId);
    return new InternalResponse(deleted);
  }

  // ======== Sections =========

  async createSection(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    dto: EstimateSectionCreateRequestDto,
  ): Promise<UniversalInternalResponse<EstimateSectionEntity>> {
    await this.assertEstimateOwnership(workspaceId, projectUuid, estimateId);
    const created = await this.repository.createSection(estimateId, dto);
    await this.repository.recalculateTotals(estimateId);
    return new InternalResponse(created);
  }

  async updateSection(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    sectionId: EntityUrlParamCommand.RequestUuidParam,
    dto: EstimateSectionUpdateRequestDto,
  ): Promise<UniversalInternalResponse<EstimateSectionEntity>> {
    await this.assertEstimateOwnership(workspaceId, projectUuid, estimateId);
    await this.assertSectionBelongsToEstimate(estimateId, sectionId);
    const updated = await this.repository.updateSectionById(sectionId, dto);
    await this.repository.recalculateTotals(estimateId);
    return new InternalResponse(updated);
  }

  async deleteSection(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    sectionId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<EstimateSectionEntity>> {
    await this.assertEstimateOwnership(workspaceId, projectUuid, estimateId);
    await this.assertSectionBelongsToEstimate(estimateId, sectionId);
    const deleted = await this.repository.deleteSectionById(sectionId);
    await this.repository.recalculateTotals(estimateId);
    return new InternalResponse(deleted);
  }

  // ======== Items =========

  async createItem(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    sectionId: EntityUrlParamCommand.RequestUuidParam,
    dto: EstimateItemCreateRequestDto,
  ): Promise<UniversalInternalResponse<EstimateItemEntity>> {
    await this.assertEstimateOwnership(workspaceId, projectUuid, estimateId);
    await this.assertSectionBelongsToEstimate(estimateId, sectionId);
    const created = await this.repository.createItem(sectionId, dto);
    await this.repository.recalculateTotals(estimateId);
    return new InternalResponse(created);
  }

  async updateItem(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    sectionId: EntityUrlParamCommand.RequestUuidParam,
    itemId: EntityUrlParamCommand.RequestUuidParam,
    dto: EstimateItemUpdateRequestDto,
  ): Promise<UniversalInternalResponse<EstimateItemEntity>> {
    await this.assertEstimateOwnership(workspaceId, projectUuid, estimateId);
    await this.assertSectionBelongsToEstimate(estimateId, sectionId);
    await this.assertItemBelongsToSection(sectionId, itemId);
    const updated = await this.repository.updateItemById(itemId, dto);
    await this.repository.recalculateTotals(estimateId);
    return new InternalResponse(updated);
  }

  async deleteItem(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectUuid: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    sectionId: EntityUrlParamCommand.RequestUuidParam,
    itemId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<EstimateItemEntity>> {
    await this.assertEstimateOwnership(workspaceId, projectUuid, estimateId);
    await this.assertSectionBelongsToEstimate(estimateId, sectionId);
    await this.assertItemBelongsToSection(sectionId, itemId);
    const deleted = await this.repository.deleteItemById(itemId);
    await this.repository.recalculateTotals(estimateId);
    return new InternalResponse(deleted);
  }

  private async assertProjectInWorkspace(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<void> {
    const ok = await this.repository.verifyProjectInWorkspace(projectId, workspaceId);
    if (!ok) {
      throw new ForbiddenException(`Проект ${projectId} не принадлежит workspace ${workspaceId}`);
    }
  }

  private async assertEstimateOwnership(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    projectId: EntityUrlParamCommand.RequestUuidParam,
    estimateId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<void> {
    await this.assertProjectInWorkspace(workspaceId, projectId);
    const ok = await this.repository.verifyEstimateInProject(estimateId, projectId);
    if (!ok) {
      throw new ForbiddenException(`Смета ${estimateId} не принадлежит проекту ${projectId}`);
    }
  }

  private async assertSectionBelongsToEstimate(
    estimateId: EntityUrlParamCommand.RequestUuidParam,
    sectionId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<void> {
    const section = await this.repository.getSectionById(sectionId);
    if (section.estimateUuid !== estimateId) {
      throw new BadRequestException(`Раздел ${sectionId} не принадлежит смете ${estimateId}`);
    }
  }

  private async assertItemBelongsToSection(
    sectionId: EntityUrlParamCommand.RequestUuidParam,
    itemId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<void> {
    const item = await this.repository.getItemById(itemId);
    if (item.sectionUuid !== sectionId) {
      throw new BadRequestException(`Строка ${itemId} не принадлежит разделу ${sectionId}`);
    }
  }
}
