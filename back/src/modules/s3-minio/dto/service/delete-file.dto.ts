import { createZodDto } from 'nestjs-zod';
import { FileStorageDeleteCommand } from 'libs/contracts';

export class FileStorageDeleteResponseDto extends createZodDto(FileStorageDeleteCommand.ResponseSchema) {}
