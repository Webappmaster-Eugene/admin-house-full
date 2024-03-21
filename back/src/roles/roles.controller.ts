import { Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole() {
    return this.rolesService.createRole();
  }

  @Get()
  getAllRoles() {
    return this.rolesService.getRoles();
  }

  getConcreteRole() {
    return this.rolesService.getRoles();
  }
}
