import { Inject, Injectable } from '@nestjs/common';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { BackendErrorNames, InternalError } from '../../common/errors/errors-description.backend';
import { UnitTemplateRepository } from './unit-template.repository';
import { UnitTemplateEntity, UnitTemplateComponentEntity } from './entities/unit-template.entity';
import { UnitTemplateCreateRequestDto } from './dto/controller/unit-template-create.dto';
import { UnitTemplateUpdateRequestDto } from './dto/controller/unit-template-update.dto';
import { UnitTemplateComponentCreateRequestDto } from './dto/controller/component-create.dto';
import { UnitTemplateComponentUpdateRequestDto } from './dto/controller/component-update.dto';

@Injectable()
export class UnitTemplateService {
  constructor(
    @Inject(KFI.UNIT_TEMPLATE_REPOSITORY)
    private readonly repository: UnitTemplateRepository,
  ) {}

  async getAllInHandbook(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UnitTemplateEntity[]>> {
    await this.assertHandbookInWorkspace(workspaceUuid, handbookUuid);
    const list = await this.repository.getAllInHandbook(handbookUuid);
    return new InternalResponse(list);
  }

  async getById(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UnitTemplateEntity>> {
    await this.assertTemplateOwnership(workspaceUuid, handbookUuid, templateUuid);
    const template = await this.repository.getById(templateUuid);
    return new InternalResponse(template);
  }

  async create(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: UnitTemplateCreateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UnitTemplateEntity>> {
    await this.assertHandbookInWorkspace(workspaceUuid, handbookUuid);
    const created = await this.repository.create(handbookUuid, dto, userUuid);
    return new InternalResponse(created);
  }

  async updateById(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: UnitTemplateUpdateRequestDto,
    userUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UnitTemplateEntity>> {
    await this.assertTemplateOwnership(workspaceUuid, handbookUuid, templateUuid);
    const updated = await this.repository.updateById(templateUuid, dto, userUuid);
    await this.repository.recalculateTemplateAggregates(templateUuid);
    return new InternalResponse(updated);
  }

  async deleteById(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UnitTemplateEntity>> {
    await this.assertTemplateOwnership(workspaceUuid, handbookUuid, templateUuid);
    const deleted = await this.repository.deleteById(templateUuid);
    return new InternalResponse(deleted);
  }

  async createComponent(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: UnitTemplateComponentCreateRequestDto,
  ): Promise<UniversalInternalResponse<UnitTemplateComponentEntity>> {
    await this.assertTemplateOwnership(workspaceUuid, handbookUuid, templateUuid);
    const created = await this.repository.createComponent(templateUuid, dto);
    await this.repository.recalculateTemplateAggregates(templateUuid);
    return new InternalResponse(created);
  }

  async updateComponent(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
    componentUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: UnitTemplateComponentUpdateRequestDto,
  ): Promise<UniversalInternalResponse<UnitTemplateComponentEntity>> {
    await this.assertTemplateOwnership(workspaceUuid, handbookUuid, templateUuid);
    await this.assertComponentBelongsToTemplate(templateUuid, componentUuid);
    const updated = await this.repository.updateComponentById(componentUuid, dto);
    await this.repository.recalculateTemplateAggregates(templateUuid);
    return new InternalResponse(updated);
  }

  async deleteComponent(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
    componentUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UnitTemplateComponentEntity>> {
    await this.assertTemplateOwnership(workspaceUuid, handbookUuid, templateUuid);
    await this.assertComponentBelongsToTemplate(templateUuid, componentUuid);
    const deleted = await this.repository.deleteComponentById(componentUuid);
    await this.repository.recalculateTemplateAggregates(templateUuid);
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

  private async assertTemplateOwnership(
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<void> {
    await this.assertHandbookInWorkspace(workspaceUuid, handbookUuid);
    const ok = await this.repository.verifyTemplateInHandbook(templateUuid, handbookUuid);
    if (!ok) {
      throw new InternalResponse(new InternalError(BackendErrorNames.UNAUTHORIZED_ACCESS));
    }
  }

  private async assertComponentBelongsToTemplate(
    templateUuid: EntityUrlParamCommand.RequestUuidParam,
    componentUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<void> {
    const component = await this.repository.getComponentById(componentUuid);
    if (component.unitTemplateUuid !== templateUuid) {
      throw new InternalResponse(new InternalError(BackendErrorNames.BAD_REQUEST));
    }
  }
}
