import { FileStorageSchema } from './file-storage.schema';

export const FileStorageBusinessValueSchema = FileStorageSchema.pick({
  nameFile: true,
  link: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});
