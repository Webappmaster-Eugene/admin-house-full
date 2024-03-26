import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class WorkspaceRequestDto {
  @ApiProperty({
    example: 'Worskspace#1',
    description: 'Название рабочего пространства',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    example: 'Description of Worskspace#1',
    description: 'Описание рабочего пространства',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор пользователя, которому принадлежит Workspace',
  })
  @IsNumber()
  @IsNotEmpty()
  workspaceCreatorId: number;
}

export class WorkspaceToUpdateRequestDto {
  @ApiProperty({
    example: 'Worskspace#1',
    description: 'Название рабочего пространства',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    example: 'Description of Worskspace#1',
    description: 'Описание рабочего пространства',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}

export class WorkspaceResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Description of Worskspace#1',
    description: 'Описание рабочего пространства',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор пользователя, которому принадлежит Workspace',
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
  @IsArray()
  workspace_members: Array<unknown>;

  @Expose({ name: 'workspaceMembers' })
  workspaceMembers() {
    return this.workspace_members;
  }

  @IsArray()
  organizations: Array<unknown>;

  @Exclude()
  @IsNumber()
  handbook_of_workspace_id: number;

  @Expose({ name: 'handbookOfWorkspaceId' })
  handbookOfWorkspaceId() {
    return this.handbook_of_workspace_id;
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

  constructor(partialData: Partial<WorkspaceResponseDto>) {
    Object.assign(this, partialData);
  }
}
