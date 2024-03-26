import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class AuthSignupRequestDto {
  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
  firstName: string;

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
    example: 'wqew4389423lrmmrarvv5-43ewfd00t4fsghg333ytr',
    description: 'Секретный ключ для регистрации пользователя',
  })
  secretKeyForChooseRole?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID роли регистрируемого пользователя',
  })
  roleId?: number;
}

export class AuthSigninRequestDto {
  @IsEmail()
  @Matches(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  )
  @ApiProperty({ example: 'example@mail.ru', description: 'Электронная почта' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Пароль с следующими требованиями: Has minimum 8 characters in length.\n' +
      'At least one uppercase English letter.\n' +
      'At least one lowercase English letter.\n' +
      'At least one digit.\n' +
      'At least one special character',
  })
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
}

export class AuthResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
  firstName: string;

  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ivanov',
    description: 'Фамилия пользователя (опционально)',
  })
  secondName: string;

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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID роли регистрируемого пользователя',
  })
  roleId: number;

  @IsNumber()
  @IsNotEmpty()
  workspaceId: number;

  @Exclude()
  @IsDate()
  createdAt: Date;

  @Exclude()
  @IsDate()
  updatedAt: Date;

  constructor(partialData: Partial<AuthResponseDto>) {
    Object.assign(this, partialData);
  }
}
