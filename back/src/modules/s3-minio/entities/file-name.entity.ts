export class FileNameEntity {
  fileName: string;

  constructor(fileName: Partial<FileNameEntity>) {
    Object.assign(this, fileName);
    return this;
  }
}
