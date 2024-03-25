import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  OrganizationRequestDto,
  OrganizationResponseDto,
} from './dto/organization.dto';
import { OrganizationServiceInterface } from './organization.repository.interface';

@Injectable()
export class OrganizationService implements OrganizationServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async createOrganizationByWorkspaceId({
    name,
    description,
  }: OrganizationRequestDto): Promise<OrganizationResponseDto> {
    try {
      const newOrganizarion = await this.prismaService.workspace.create({
        data: {
          name,
          description,
          workspace_creator_id: 1,
        },
      });
      this.logger.log(
        `Organizarion created successfully - newOrganizarionId ${newOrganizarion.id}`,
        OrganizationService.name,
      );
      return new OrganizationResponseDto(newOrganizarion);
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

  async updateOrganizationById(
    { name, description }: OrganizationRequestDto,
    id: number,
  ): Promise<OrganizationResponseDto> {
    try {
      const updatedWorkspace = await this.prismaService.workspace.update({
        where: {
          id,
        },
        data: {
          name,
          description,
        },
      });

      this.logger.log(
        `Workspace updated successfully - workspaceId ${id}`,
        OrganizationService.name,
      );
      return new OrganizationResponseDto(updatedWorkspace);
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

  async getAllOrganizations(): Promise<OrganizationResponseDto[]> {
    try {
      const allWorkspaces = await this.prismaService.workspace.findMany();
      const workspacesToView = allWorkspaces.map(
        (workspace) => new OrganizationResponseDto(workspace),
      );
      this.logger.log(
        `All workspaces successfully received`,
        OrganizationService.name,
      );
      return workspacesToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при запросе всех Workspaces`,
        error.stack,
        OrganizationService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrganizationById(id: number): Promise<OrganizationResponseDto> {
    try {
      const concreteWorkspace = await this.prismaService.workspace.findUnique({
        where: {
          id,
        },
      });
      const workspaceToView = new OrganizationResponseDto(concreteWorkspace);

      this.logger.log(
        `Workspace received successfully`,
        OrganizationService.name,
      );
      return workspaceToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при получении Workspace c id ${id}`,
        error.stack,
        OrganizationService.name,
      );
      throw new HttpException(
        `Произошла ошибка при получении Workspace c id ${id} - Workspace не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
