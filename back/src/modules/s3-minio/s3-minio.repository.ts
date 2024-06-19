// import { Inject, Injectable } from '@nestjs/common';
// import { EUserTypeVariants } from '.prisma/client';
// import { RoleCreateRequestDto } from './dto/controller/create-role.dto';
// import { IPrismaService } from '../../common/types/main/prisma.interface';
// import { IRoleRepository } from './types/role.repository.interface';
// import { RoleUpdateRequestDto } from './dto/controller/update-role.dto';
// import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
// import { CountData } from '../../common/types/main/count.data';
// import { RoleEntity } from './entities/role.entity';
// import { KFI } from '../../common/utils/di';
// import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
// import { EntityName } from '../../common/types/entity.enum';
// import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
//
// @Injectable()
// export class S3MinioRepository {
//   constructor(
//     @Inject(KFI.PRISMA_SERVICE)
//     private readonly databaseService: IPrismaService,
//   ) {}
//
//   async getByValue(fileName: string): Promise<string> {
//     try {
//       const concreteFile = await this.databaseService.fileStorage.findUnique({
//         where: {
//           name: roleName,
//         },
//       });
//       return existenceEntityHandler(concreteRole, RoleEntity, EntityName.ROLE, {
//         message: `${EntityName.ROLE} with this roleName ${roleName} not found`,
//         description: `${EntityName.ROLE} from your request did not found in the database. Please, check that the entered roleName is correct!`,
//       }) as RoleEntity;
//     } catch (error: unknown) {
//       errorRepositoryHandler(error);
//     }
//   }
//
//   async create({ name, description }: RoleCreateRequestDto): Promise<RoleEntity> {
//     try {
//       const newRole = await this.databaseService.role.create({
//         data: {
//           name,
//           description,
//         },
//       });
//       return existenceEntityHandler(newRole, RoleEntity, EntityName.ROLE) as RoleEntity;
//     } catch (error: unknown) {
//       errorRepositoryHandler(error);
//     }
//   }
//
//   async updateById(roleUuid: EntityUrlParamCommand.RequestUuidParam, { description }: RoleUpdateRequestDto): Promise<RoleEntity> {
//     try {
//       const updatedRole = await this.databaseService.role.update({
//         where: {
//           uuid: roleUuid,
//         },
//         data: {
//           description,
//         },
//       });
//       return existenceEntityHandler(updatedRole, RoleEntity, EntityName.ROLE) as RoleEntity;
//     } catch (error: unknown) {
//       errorRepositoryHandler(error);
//     }
//   }
//
//   async deleteById(roleUuid: EntityUrlParamCommand.RequestUuidParam): Promise<RoleEntity> {
//     try {
//       const deletedRole = await this.databaseService.role.delete({
//         where: {
//           uuid: roleUuid,
//         },
//       });
//       return existenceEntityHandler(deletedRole, RoleEntity, EntityName.ROLE) as RoleEntity;
//     } catch (error: unknown) {
//       errorRepositoryHandler(error);
//     }
//   }
// }
