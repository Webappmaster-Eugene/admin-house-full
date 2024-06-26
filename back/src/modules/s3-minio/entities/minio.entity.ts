import { FileStorage } from '.prisma/client';

export class FileStorageEntity implements FileStorage {
  uuid: string;
  comment: string;
  nameFile: string;
  link: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(fileStorage: Partial<FileStorage>) {
    Object.assign(this, fileStorage);
    return this;
  }
}
