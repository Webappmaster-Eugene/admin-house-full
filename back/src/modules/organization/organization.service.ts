import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  OrganizationRequestDto,
  OrganizationResponseDto,
} from './dto/organization.dto';
import { OrganizationServiceInterface } from './organization.repository.interface';
import { JWTPayload } from '../../lib/types/jwt.payload.interface';
import { workspaceExtractor } from './lib/workspace.extractor';
import { Workspace } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrganizationService implements OrganizationServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async createOrganizationByWorkspaceId(
    { name, description }: OrganizationRequestDto,
    user: JWTPayload,
  ): Promise<OrganizationResponseDto> {
    try {
      const workspace: {
        id: number;
        name: string;
      } = await workspaceExtractor(this.prismaService, user.id);

      name = name || `Organization of User #${user.id} ${uuidv4()}`;

      description =
        description ||
        `Organization of User #${user.id} in Workspace #${workspace.id}`;

      const newOrganization = await this.prismaService.organization.create({
        data: {
          name,
          description,
          workspace_id: workspace.id,
          organization_leader_id: user.id,
        },
      });

      this.logger.log(
        `Organization created successfully - newOrganizarionId ${newOrganization.id}`,
        OrganizationService.name,
      );
      return new OrganizationResponseDto(newOrganization);
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2002') {
      //   }
      this.logger.error(
        `There is an error, when Organization is creating in Workspace by user with id ${user.email}`,
        error.stack,
        OrganizationService.name,
      );

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
      const allWorkspaces = await this.prismaService.organization.findMany();
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
      const concreteWorkspace =
        await this.prismaService.organization.findUnique({
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
