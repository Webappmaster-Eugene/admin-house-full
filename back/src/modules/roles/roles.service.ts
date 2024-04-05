import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from './entities/role.entity';
import { IRoleService } from './types/role.service.interface';
import { RoleCreateRequestDto } from './dto/create-role.dto';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { ILogger } from '../../common/types/main/logger.interface';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IRoleRepository } from './types/role.repository.interface';

@Injectable()
export class RolesService implements IRoleService {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly configService: ConfigService<IConfigService>,
    private readonly logger: ILogger,
  ) {}

  checkIsAdminSecretKey(key: string): boolean {
    return key === this.configService.get('STRICT_ADMIN_KEY');
  }

  async create(dto: RoleCreateRequestDto): Promise<RoleEntity> {
    if (this.checkIsAdminSecretKey(dto.key)) {
      try {
        const newRole = await this.roleRepository.create(dto);

        return new RoleEntity(newRole);
      } catch (error) {
          return null;
    } else {
      return new
    }
  }

  async updateById({
    name,
    description,
    key,
  }: RolesRequestDto): Promise<RoleEntity> {
    if (this.checkIsAdminSecretKey(key)) {
      try {
        const newRole = await this.prismaService.role.create({
          data: {
            name,
            description,
          },
        });
        this.logger.log(
          `Role created successfully - newRoleId ${newRole.id}`,
          RolesService.name,
        );
        return new RoleEntity(newRole);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            this.logger.error(
              `There is a unique constraint violation - ${name}`,
              error.stack,
              RolesService.name,
            );
            throw new HttpException(
              'Такая роль уже существует!',
              HttpStatus.CONFLICT,
            );
          }

          throw new HttpException(
            `${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    } else {
      throw new UnauthorizedException(
        'У вас нет прав доступа для создания роли',
      );
    }
  }

  async getAll(): Promise<RoleEntity[]> {
    try {
      const allRoles = await this.prismaService.role.findMany();
      const rolesToView = allRoles.map((role) => new RoleEntity(role));
      this.logger.log(`All roles successfully received`, RolesService.name);
      return rolesToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при запросе всех ролей`,
        error.stack,
        RolesService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(value: EUserTypeVariants): Promise<RoleEntity> {
    try {
      const concreteRole = await this.prismaService.role.findUnique({
        where: {
          name: value,
        },
      });
      const roleToView = new RoleEntity(concreteRole);

      this.logger.log(`Role received successfully`, RolesService.name);
      return roleToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при получении роли ${value}`,
        error.stack,
        RolesService.name,
      );
      throw new HttpException(
        `Произошла ошибка при получении роли ${value} - роли не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getByValue(value: EUserTypeVariants): Promise<RoleEntity> {
    try {
      const concreteRole = await this.prismaService.role.findUnique({
        where: {
          name: value,
        },
      });
      const roleToView = new RoleEntity(concreteRole);

      this.logger.log(`Role received successfully`, RolesService.name);
      return roleToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при получении роли ${value}`,
        error.stack,
        RolesService.name,
      );
      throw new HttpException(
        `Произошла ошибка при получении роли ${value} - роли не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
