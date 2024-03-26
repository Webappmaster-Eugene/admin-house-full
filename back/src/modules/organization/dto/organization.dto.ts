import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { DefaultValuePipe } from '@nestjs/common';

export class OrganizationRequestDto {
  @ApiProperty({
    example: 'Organization of User#1',
    description: 'Название организации',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    example: 'Description of Organization of User#1',
    description: 'Описание организации',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}

export class OrganizationResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Organization of User#1',
    description: 'Название организации',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    example: 'Description of Organization of User#1',
    description: 'Описание организации',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор пользователя, который владеет организацией',
  })
  @Exclude()
  @IsNumber()
  @IsNotEmpty()
  workspace_creator_id: number;

  @Expose({ name: 'workspaceCreatorId' })
  workspaceCreatorId() {
    return this.workspace_creator_id;
  }

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

  constructor(partialData: Partial<OrganizationResponseDto>) {
    Object.assign(this, partialData);
  }
}
