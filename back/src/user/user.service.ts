import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rolesService: RolesService,
  ) {}

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async createUser() {
    // const role = await this.rolesService.getRoleByValue('USER');

    return [];
  }
}
