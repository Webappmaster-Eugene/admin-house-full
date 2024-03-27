import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { defaultRoleId } from '../auth/lib/auth.consts';

class CreatorOfWorkspaceNestedResponseDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  // @Exclude()
  // @IsArray()
  // workspace_members: Array<unknown>;
  //
  // @Expose({ name: 'workspaceMembers' })
  // workspaceMembers() {
  //   return this.workspace_members;
  // }

  @Transform(({ key, value }) => 1)
  handbook_of_workspace_id?: number;

  //@Expose({ name: 'handbookOfWorkspaceId' })
  //handbookOfWorkspaceId() {
  //  return this.handbook_of_workspace_id;
  //}
}

export class UserRequestDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
  firstName: string;

  @IsOptional()
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ivanov',
    description: 'Фамилия пользователя (опционально)',
  })
  secondName?: string;

  @IsOptional()
  @IsPhoneNumber()
  @Matches(
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  )
  @ApiProperty({
    example: '+79200808999',
    description: 'Номер телефона (опционально)',
  })
  phone?: string;

  @IsEmail()
  @Matches(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  )
  @ApiProperty({ example: 'example@mail.ru', description: 'Электронная почта' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  @ApiProperty({
    example: '!Qwerty8',
    description:
      'Пароль с следующими требованиями: Has minimum 8 characters in length.\n' +
      'At least one uppercase English letter.\n' +
      'At least one lowercase English letter.\n' +
      'At least one digit.\n' +
      'At least one special character',
  })
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'г.Москва, ул.Иванова, д.7',
    description: 'Адрес местонахождения',
  })
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Additional info',
    description: 'Дополнительная информация',
  })
  info?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '5533 225522', description: 'Номер документов' })
  documents?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  roleId?: number;
}

export class UserUpdateRequestDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
  firstName: string;

  @IsOptional()
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ivanov',
    description: 'Фамилия пользователя (опционально)',
  })
  secondName?: string;

  @IsOptional()
  @IsPhoneNumber()
  @Matches(
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  )
  @ApiProperty({
    example: '+79200808700',
    description: 'Номер телефона (опционально)',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'г.Москва, ул.Иванова, д.7',
    description: 'Адрес местонахождения',
  })
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Additional info',
    description: 'Дополнительная информация',
  })
  info?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '5533 225522', description: 'Номер документов' })
  documents?: string;
}

/*
export type UserUpdateRequestDto = Partial<
  Pick<
    UserRequestDto,
    | 'phone'
    | 'firstName'
    | 'secondName'
    | 'address'
    | 'info'
    | 'workspaceId'
    | 'documents'
  >
>;
*/

/*
export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Exclude()
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
  first_name: string;

  @Expose({ name: 'firstName' })
  firstName() {
    return this.first_name;
  }

  @Exclude()
  @IsOptional()
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ivanov',
    description: 'Фамилия пользователя (опционально)',
  })
  second_name: string;

  @Expose({ name: 'secondName' })
  secondName() {
    return this.second_name;
  }

  @IsOptional()
  @IsPhoneNumber()
  @Matches(
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  )
  @ApiProperty({
    example: '+79200808700',
    description: 'Номер телефона (опционально)',
  })
  phone: string;

  @IsEmail()
  @Matches(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  )
  @ApiProperty({ example: 'example@mail.ru', description: 'Электронная почта' })
  email: string;

  @Exclude()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  @ApiProperty({
    example: '!Qwerty8',
    description:
      'Пароль с следующими требованиями: Has minimum 8 characters in length.\n' +
      'At least one uppercase English letter.\n' +
      'At least one lowercase English letter.\n' +
      'At least one digit.\n' +
      'At least one special character',
  })
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'г.Москва, ул.Иванова, д.7',
    description: 'Адрес местонахождения',
  })
  address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Additional info',
    description: 'Дополнительная информация',
  })
  info: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '5533 225522', description: 'Номер документов' })
  documents: string;

  @Exclude()
  @IsNumber()
  @IsNotEmpty()
  workspace_id: number;

  @Expose({ name: 'workspaceId' })
  workspaceId() {
    return this.workspace_id;
  }

  @Exclude()
  @IsNumber()
  @IsNotEmpty()
  role_id: number;

  @Expose({ name: 'roleId' })
  roleId() {
    return this.role_id;
  }

  // @Type(() => CreatorOfWorkspaceNestedResponseDto)
  // @ValidateNested()
  // @Expose({ name: 'creatorOfWorkspace' })
  // creatorOfWorkspace(): CreatorOfWorkspaceNestedResponseDto {
  //   return this.creator_of_workspace;
  // }

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

  // @Exclude()
  @Type(() => CreatorOfWorkspaceNestedResponseDto)
  @ValidateNested()
  creator_of_workspace: CreatorOfWorkspaceNestedResponseDto;

  constructor(partialData: Partial<UserResponseDto>) {
    return Object.assign(this, partialData);
  }
}
*/
