import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HomeService } from './home.service';
import {
  HomeRequestDto,
  HomeResponseDto,
  InquireDto,
  UpdateHomeDto,
} from './dto/home.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from '../user/auth/dto/auth.dto';
import { PropertyType, UserType } from '@prisma/client';
import { User, UserInfoToken } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesSetting } from '../decorators/roles.decorator';
import { ConfigService } from '@nestjs/config';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Роли пользователей')
@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: 'dd' })
  @Get()
  getHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
  ): Promise<HomeResponseDto[]> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) }),
          }
        : undefined;

    const filters = {
      ...(city && { city }),
      ...(price && { price }),
      ...(propertyType && { property_type: propertyType }),
    };
    return this.homeService.getHomes(filters);
  }

  @Get(':id')
  getHomeById(@Param('id') id: string) {
    return this.homeService.getConcreteHome(id);
  }

  @RolesSetting(UserType.REALTOR)
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post()
  createHome(@Body() body: HomeRequestDto, @User() user: UserInfoToken) {
    return this.homeService.createHome(body, user.id);
  }

  @RolesSetting(UserType.REALTOR)
  @Put(':id')
  async updateHomeById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHomeDto,
    @User() user: UserInfoToken,
  ) {
    const realtor = await this.homeService.getRealtorByIdHome(id);
    if (realtor.id !== user.id) {
      throw new UnauthorizedException(
        'У вас нет соответствующих прав для данной операции',
      );
    }
    return this.homeService.updateHome(id, body);
  }

  @RolesSetting(UserType.REALTOR)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteHomeById(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserInfoToken,
  ) {
    const realtor = await this.homeService.getRealtorByIdHome(id);
    if (realtor.id !== user.id) {
      throw new UnauthorizedException(
        'У вас нет соответствующих прав для данной операции',
      );
    }

    return this.homeService.deleteHome(id);
  }

  @RolesSetting(UserType.BUYER)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('/inquire/:id')
  async inquire(
    @Param('id', ParseIntPipe) homeId: number,
    @User() user: UserInfoToken,
    @Body() { message }: InquireDto,
  ) {
    return this.homeService.inquire(user, homeId, message);
  }

  @RolesSetting(UserType.REALTOR)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get('/:id/messages')
  async getHomeMessages(
    @Param('id', ParseIntPipe) homeId: number,
    @User() user: UserInfoToken,
  ) {
    const realtor = await this.homeService.getRealtorByIdHome(homeId);

    if (realtor.id !== user.id) {
      throw new UnauthorizedException(
        'У вас нет соответствующих прав для данной операции',
      );
    }

    return this.homeService.getMessagesByHomeId(homeId);
  }

  @UseGuards(AuthGuard)
  @Get('/:id/files')
  async getFiles(@Param('id', ParseIntPipe) homeId: number) {
    return this.homeService.getFilesInHome();
  }

  @RolesSetting(UserType.BUYER)
  @UseGuards(AuthGuard)
  @Post('/:id/files')
  @UseInterceptors(FileInterceptor('image'))
  async createFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10485760 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseIntPipe) homeId: number,
  ) {
    return this.homeService.createFilesAtHome(file, homeId);
  }
}
