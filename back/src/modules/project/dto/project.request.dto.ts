import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectRequestDto {
  @ApiProperty({
    example: 'Project of User#1',
    description: 'Название проекта',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Description of Project of User#1',
    description: 'Описание проекта',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор заказчика',
  })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;
}
