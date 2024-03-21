import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRole() {
    return [];
  }

  async getRoles() {
    return [];
  }

  async getRoleByValue() {
    return [];
  }
}
