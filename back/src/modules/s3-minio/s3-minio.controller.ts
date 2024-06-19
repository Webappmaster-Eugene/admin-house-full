import { Controller, Get, Post, Param, Delete, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3MinioService } from 'src/modules/s3-minio/s3-minio.service';
import { RolesSetting } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { EUserTypeVariants } from '.prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Работа с Files')
@Controller('files')
export class S3MinioController {
  constructor(private readonly minioService: S3MinioService) {}

  //region SWAGGER
  @ApiOperation({ summary: 'Создание File' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.minioService.createBucketIfNotExists();
    const fileName = await this.minioService.uploadFile(file);
    return fileName;
  }

  //region SWAGGER
  @ApiOperation({ summary: 'Получение File' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Get('get/:fileName')
  async getFile(@Param('fileName') fileName: string) {
    const fileUrl = await this.minioService.getFileUrl(fileName);
    return fileUrl;
  }

  //region SWAGGER
  @ApiOperation({ summary: 'Удаление File' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('delete/:fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    await this.minioService.deleteFile(fileName);
    return fileName;
  }
}
