import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EUserTypeVariants } from '@prisma/client';
import {
  ProjectCreateRequestDto,
  ProjectCreateResponseDto,
} from '../dto/controller/create-project.dto';
import {
  ProjectUpdateRequestDto,
  ProjectUpdateResponseDto,
} from '../dto/controller/update-project.dto';
import { ProjectGetResponseDto } from '../dto/controller/get-project.dto';
import { ProjectGetAllResponseDto } from '../dto/controller/get-all-projects.dto';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { ProjectDeleteResponseDto } from '../dto/controller/delete-project.dto';

export interface IProjectController
  extends IControllerCommon<
    ProjectCreateRequestDto,
    ProjectUpdateRequestDto,
    ProjectGetResponseDto,
    ProjectGetAllResponseDto,
    ProjectCreateResponseDto,
    ProjectUpdateResponseDto,
    void,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalExternalResponse<ProjectGetResponseDto | null>>;
  getByValueEP: (
    value: EUserTypeVariants,
  ) => Promise<UniversalExternalResponse<ProjectGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<ProjectGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: ProjectCreateRequestDto,
  ) => Promise<UniversalExternalResponse<ProjectCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
    dto: ProjectUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<ProjectUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalExternalResponse<ProjectDeleteResponseDto>>;
}
