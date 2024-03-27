import { OrganizationRequestDto } from './dto/organization.dto';
import { JWTPayload } from '../../lib/types/jwt.payload.interface';
import { OrganizationEntity } from './entities/organization.entity';

export interface OrganizationServiceInterface {
  getAllOrganizations: () => Promise<OrganizationEntity[]>;
  getOrganizationById: (id: number) => Promise<OrganizationEntity>;
  createOrganizationByWorkspaceId: (
    body: OrganizationRequestDto,
    user: JWTPayload,
  ) => Promise<OrganizationEntity>;
  updateOrganizationById: (
    body: OrganizationRequestDto,
    id: number,
  ) => Promise<OrganizationEntity>;
}
