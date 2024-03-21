import { IsNotEmpty, IsString } from 'class-validator';
import { PropertyType, UserType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';

export class RoleRequestDto {
  // @IsString()
  // @IsNotEmpty()
  address: string;
}
