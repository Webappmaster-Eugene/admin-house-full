import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsNumber()
  @IsNotEmpty()
  workspaceId: number;
}
