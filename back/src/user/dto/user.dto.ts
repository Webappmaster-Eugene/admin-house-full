import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  id                          Int               @id @default(autoincrement())
  first_name                  String
  second_name                 String
  phone                       String?
  email                       String            @unique
  password                    String
  address                     String?
  info                        String?
  documents                   String
  workspace                   Workspace         @relation(fields: [workspace_id], references: [id])
  workspace_id                Int               @unique
  organization                Organization[]
  project_customer            Project[]         @relation("project_customer")
  project_responsible_manager Project[]         @relation("project_responsible_manager")
  created_field_of_category   FieldOfCategory[]
  created_at                  DateTime          @default(now())
  updated_at                  DateTime          @updatedAt
  changed_price               PriceChanging[]
  role_id                     Int
  role                        Role              @relation(fields: [role_id], references: [id])
  
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  id: number;
  @ApiProperty({ example: 'Ivan', description: 'Уникальный идентификатор' })
  name: string;
  @ApiProperty({
    example: '+79009999999',
    description: 'Уникальный идентификатор',
  })
  phone: string;
  @ApiProperty({
    example: 'mail@gmail.com',
    description: 'Уникальный идентификатор',
  })
  email: string;
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  password: string;
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  created_at: string;
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  updated_at: string;
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  user_type: UserType;
}
