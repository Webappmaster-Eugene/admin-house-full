import { createZodDto } from 'nestjs-zod';
import { FileStorageGetCommand } from 'libs/contracts';

export class FileStorageGetResponseDto extends createZodDto(FileStorageGetCommand.ResponseSchema) {}
