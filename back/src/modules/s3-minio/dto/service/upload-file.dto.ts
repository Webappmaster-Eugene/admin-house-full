import { createZodDto } from 'nestjs-zod';
import { FileStorageCreateCommand } from 'libs/contracts';

export class FileStorageCreateRequestDto extends createZodDto(FileStorageCreateCommand.RequestSchema) {}

export class FileStorageCreateResponseDto extends createZodDto(FileStorageCreateCommand.ResponseSchema) {}
