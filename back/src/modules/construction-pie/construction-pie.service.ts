import { Inject, Injectable } from '@nestjs/common';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { BackendErrorNames, InternalError } from '../../common/errors/errors-description.backend';
import { ConstructionPieRepository } from './construction-pie.repository';
import { ConstructionPieEntity, PieLayerEntity } from './entities/construction-pie.entity';
import { ConstructionPieCreateRequestDto } from './dto/controller/pie-create.dto';
import { ConstructionPieUpdateRequestDto } from './dto/controller/pie-update.dto';
import { PieLayerCreateRequestDto } from './dto/controller/layer-create.dto';
import { PieLayerUpdateRequestDto } from './dto/controller/layer-update.dto';

@Injectable()
export class ConstructionPieService {
  constructor(
    @Inject(KFI.CONSTRUCTION_PIE_REPOSITORY)
    private readonly repository: ConstructionPieRepository,
  ) {}

  async getAllInHandbook(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ConstructionPieEntity[]>> {
    await this.assertHandbookInWorkspace(workspaceUuid, handbookUuid);
    const list = await this.repository.getAllInHandbook(handbookUuid);
    return new InternalResponse(list);
  }

  async getById(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ConstructionPieEntity>> {
    await this.assertPieOwnership(workspaceUuid, handbookUuid, pieUuid);
    const pie = await this.repository.getById(pieUuid);
    return new InternalResponse(pie);
  }

  async create(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: ConstructionPieCreateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ConstructionPieEntity>> {
    await this.assertHandbookInWorkspace(workspaceUuid, handbookUuid);
    const created = await this.repository.create(handbookUuid, dto, userUuid);
    return new InternalResponse(created);
  }

  async updateById(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: ConstructionPieUpdateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ConstructionPieEntity>> {
    await this.assertPieOwnership(workspaceUuid, handbookUuid, pieUuid);
    const updated = await this.repository.updateById(pieUuid, dto, userUuid);
    await this.repository.recalculatePieAggregates(pieUuid);
    return new InternalResponse(updated);
  }

  async deleteById(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ConstructionPieEntity>> {
    await this.assertPieOwnership(workspaceUuid, handbookUuid, pieUuid);
    const deleted = await this.repository.deleteById(pieUuid);
    return new InternalResponse(deleted);
  }

  async createLayer(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: PieLayerCreateRequestDto,
  ): Promise<UniversalInternalResponse<PieLayerEntity>> {
    await this.assertPieOwnership(workspaceUuid, handbookUuid, pieUuid);
    const created = await this.repository.createLayer(pieUuid, dto);
    await this.repository.recalculatePieAggregates(pieUuid);
    return new InternalResponse(created);
  }

  async updateLayer(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
    layerUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: PieLayerUpdateRequestDto,
  ): Promise<UniversalInternalResponse<PieLayerEntity>> {
    await this.assertPieOwnership(workspaceUuid, handbookUuid, pieUuid);
    await this.assertLayerBelongsToPie(pieUuid, layerUuid);
    const updated = await this.repository.updateLayerById(layerUuid, dto);
    await this.repository.recalculatePieAggregates(pieUuid);
    return new InternalResponse(updated);
  }

  async deleteLayer(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
    layerUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<PieLayerEntity>> {
    await this.assertPieOwnership(workspaceUuid, handbookUuid, pieUuid);
    await this.assertLayerBelongsToPie(pieUuid, layerUuid);
    const deleted = await this.repository.deleteLayerById(layerUuid);
    await this.repository.recalculatePieAggregates(pieUuid);
    return new InternalResponse(deleted);
  }

  private async assertHandbookInWorkspace(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<void> {
    const ok = await this.repository.verifyHandbookInWorkspace(handbookUuid, workspaceUuid);
    if (!ok) {
      throw new InternalResponse(new InternalError(BackendErrorNames.UNAUTHORIZED_ACCESS));
    }
  }

  private async assertPieOwnership(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<void> {
    await this.assertHandbookInWorkspace(workspaceUuid, handbookUuid);
    const ok = await this.repository.verifyPieInHandbook(pieUuid, handbookUuid);
    if (!ok) {
      throw new InternalResponse(new InternalError(BackendErrorNames.UNAUTHORIZED_ACCESS));
    }
  }

  private async assertLayerBelongsToPie(
    pieUuid: EntityUrlParamCommand.RequestUuidParam,
    layerUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<void> {
    const layer = await this.repository.getLayerById(layerUuid);
    if (layer.constructionPieUuid !== pieUuid) {
      throw new InternalResponse(new InternalError(BackendErrorNames.BAD_REQUEST));
    }
  }
}
