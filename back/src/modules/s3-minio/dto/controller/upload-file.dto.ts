import { createZodDto } from 'nestjs-zod';
import { FileStorageCreateCommand } from 'libs/contracts';

export interface FileStorageControllerCreateRequestDto {
  nameFile?: string;
  comment?: string;
}
