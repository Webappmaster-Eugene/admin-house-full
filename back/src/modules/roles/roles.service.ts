import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RolesRequestDto, RolesResponseDto } from './dto/role.dto';
import { RolesServiceInterface } from './roles.repository.interface';

@Injectable()
export class RolesService implements RolesServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  checkIsAdminSecretKey(key: string): boolean {
    return key === this.configService.get('STRICT_ADMIN_KEY');
  }

  async createRole({ name, key }: RolesRequestDto): Promise<RolesResponseDto> {
    if (this.checkIsAdminSecretKey(key)) {
      try {
        const newRole = await this.prismaService.role.create({
          data: {
            name,
          },
        });
        this.logger.log(
          `Role created successfully - newRoleId ${newRole.id}`,
          RolesService.name,
        );
        return new RolesResponseDto(newRole);
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

  async getAllRoles(): Promise<RolesResponseDto[]> {
    try {
      const allRoles = await this.prismaService.role.findMany();
      const rolesToView = allRoles.map((role) => new RolesResponseDto(role));
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

  async getRoleByValue(value: EUserTypeVariants): Promise<RolesResponseDto> {
    try {
      const concreteRole = await this.prismaService.role.findUnique({
        where: {
          name: value,
        },
      });
      const roleToView = new RolesResponseDto(concreteRole);

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
