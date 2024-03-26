import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EUserTypeVariants } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class RolesRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(EUserTypeVariants, {
    message: 'Роли в приложении могут быть только: ADMIN, MANAGER, CUSTOMER',
  })
  name: EUserTypeVariants;

  @IsString()
  @IsNotEmpty()
  key: string;
}

export class RolesResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: EUserTypeVariants;

  @Exclude()
  @IsDate()
  created_at: Date;

  @Expose({ name: 'createdAt' })
  createdAt() {
    return this.created_at;
  }

  @Exclude()
  @IsDate()
  updated_at: Date;

  @Expose({ name: 'updatedAt' })
  updatedAt() {
    return this.updated_at;
  }

  constructor(partialData: Partial<RolesResponseDto>) {
    Object.assign(this, partialData);
  }
}
