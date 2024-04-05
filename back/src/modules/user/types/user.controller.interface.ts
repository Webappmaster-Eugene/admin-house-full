import { LoginRequestDto, LoginResponseDto } from '../dto/login.dto';
import { RegisterRequestDto, RegisterResponseDto } from '../dto/register.dto';
import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { UserEntity } from '../entities/user.entity';
import { Prisma } from '@prisma/client';

export interface IUserController
  extends IControllerCommon<UserEntity, RegisterRequestDto> {
  getByIdEP: (id: string) => Promise<ResponseDto | null>;
  createEP: (dto: RegisterRequestDto) => Promise<ResponseDto>;
  updateByIdEP: (id: string, dto: unknown) => Promise<ResponseDto>;
  deleteByIdsEP: (ids: string[]) => Promise<Prisma.BatchPayload>;
  findByCriteriaEP: (
    dto: unknown,
    sort: Record<string, string>[],
  ) => Promise<ResponseDto[]>;

  registerEP: (dto: RegisterRequestDto) => Promise<RegisterResponseDto>;
  loginEP: (dto: LoginRequestDto) => Promise<LoginResponseDto>;
  generateStrictAdminKeyEP: ({ key }: { key: string }) => Promise<string>;
}
