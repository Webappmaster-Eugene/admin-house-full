import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ProjectRequestDto } from './dto/project.request.dto';
import { ProjectServiceInterface } from './project.repository.interface';
import { JWTPayload } from '../../lib/types/jwt.payload.interface';
import { v4 as uuidv4 } from 'uuid';
import { ProjectEntity } from './entities/project.entity';

@Injectable()
export class ProjectService implements ProjectServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async createProjectByOrganizationId(
    { name, description }: ProjectRequestDto,
    user: JWTPayload,
  ): Promise<ProjectEntity> {
    try {
      return new ProjectEntity({});
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2002') {
      //   }
      this.logger.error(
        `There is an error, where Project id ${user.email}`,
        error.stack,
        ProjectService.name,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProjectById(
    { name, description }: ProjectRequestDto,
    id: number,
  ): Promise<ProjectEntity> {
    try {
      const updatedWorkspace = await this.prismaService.organization.update({
        where: {
          id: id,
        },
        data: {
          name,
          description,
        },
      });

      this.logger.log(
        `Project updated successfully - projectId ${id}`,
        ProjectService.name,
      );
      return new ProjectEntity(updatedWorkspace);
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2002') {
      //   }

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllProjects(): Promise<ProjectEntity[]> {
    try {
      const allWorkspaces = await this.prismaService.organization.findMany();
      const workspacesToView = allWorkspaces.map(
        (workspace) => new ProjectEntity(workspace),
      );
      this.logger.log(
        `All Projects successfully received`,
        ProjectService.name,
      );
      return workspacesToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при запросе всех Projects`,
        error.stack,
        ProjectService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProjectById(id: number): Promise<ProjectEntity> {
    try {
      const concreteWorkspace =
        await this.prismaService.organization.findUnique({
          where: {
            id,
          },
        });
      const workspaceToView = new ProjectEntity(concreteWorkspace);

      this.logger.log(`Project received successfully`, ProjectService.name);
      return workspaceToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при получении Project c id ${id}`,
        error.stack,
        ProjectService.name,
      );
      throw new HttpException(
        `Произошла ошибка при получении Project c id ${id} - Project не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
