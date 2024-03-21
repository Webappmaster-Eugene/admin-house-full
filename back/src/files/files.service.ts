import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import { promises as fs } from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file) {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      const fileExists = async (path) =>
        !!(await fs.stat(path).catch((error) => false));

      const exists = await fileExists(path);

      if (!exists) {
        await fs.mkdir(filePath, { recursive: true });
      }

      await fs.writeFile(path.join(filePath, fileName), file.buffer);

      return { fileName, path: path.join(filePath, fileName) };
    } catch (err) {
      throw new HttpException(
        'Произошла ошибка при записи',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
