import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EUserTypeVariants } from '@prisma/client';

export class RolesRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(EUserTypeVariants, {
    message: 'Роли в приложении могут быть только: ADMIN, MANAGER, CUSTOMER',
  })
  name: EUserTypeVariants;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  key: string;
}
