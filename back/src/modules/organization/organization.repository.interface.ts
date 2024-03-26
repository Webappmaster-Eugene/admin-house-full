import {
  OrganizationRequestDto,
  OrganizationResponseDto,
} from './dto/organization.dto';
import { JWTPayload } from '../../lib/types/jwt.payload.interface';

export interface OrganizationServiceInterface {
  getAllOrganizations: () => Promise<OrganizationResponseDto[]>;
  getOrganizationById: (id: number) => Promise<OrganizationResponseDto>;
  createOrganizationByWorkspaceId: (
    body: OrganizationResponseDto,
    user: JWTPayload,
  ) => Promise<OrganizationResponseDto>;
  updateOrganizationById: (
    body: OrganizationRequestDto,
    id: number,
  ) => Promise<OrganizationResponseDto>;
}
