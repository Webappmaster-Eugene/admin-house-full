import {
  OrganizationRequestDto,
  OrganizationResponseDto,
} from './dto/organization.dto';

export interface OrganizationServiceInterface {
  getAllOrganizations: () => Promise<OrganizationResponseDto[]>;
  getOrganizationById: (id: number) => Promise<OrganizationResponseDto>;
  createOrganizationByWorkspaceId: (
    body: OrganizationResponseDto,
    id: number,
  ) => Promise<OrganizationResponseDto>;
  updateOrganizationById: (
    body: OrganizationRequestDto,
    id: number,
  ) => Promise<OrganizationResponseDto>;
}
