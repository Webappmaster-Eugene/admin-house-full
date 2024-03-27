import { ProjectRequestDto } from './dto/project.request.dto';
import { JWTPayload } from '../../lib/types/jwt.payload.interface';
import { ProjectEntity } from './entities/project.entity';

export interface ProjectServiceInterface {
  getAllProjects: () => Promise<ProjectEntity[]>;
  getProjectById: (id: number) => Promise<ProjectEntity>;
  createProjectByOrganizationId: (
    body: ProjectRequestDto,
    user: JWTPayload,
  ) => Promise<ProjectEntity>;
  updateProjectById: (
    body: ProjectRequestDto,
    id: number,
  ) => Promise<ProjectEntity>;
}
