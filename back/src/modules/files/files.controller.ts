import { Controller, Get, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FilesService } from './files.service';

@ApiTags('Работа с файлами')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: 'dd' })
  @Get()
  getfiles() {
    return [];
    // return this.filesService.getFiles(filters);
  }

  @Post()
  loadFile() {
    return [];
    // return this.homeService.createHome(body, auth.id);
  }
}
