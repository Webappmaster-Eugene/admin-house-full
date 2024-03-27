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
