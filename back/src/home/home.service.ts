import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HomeRequestDto, HomeResponseDto, UpdateHomeDto } from './dto/home.dto';
import { GetHomesParam } from './types/home.types';
import { UserInfoToken } from '../decorators/user.decorator';
import { FilesService } from '../files/files.service';

@Injectable()
export class HomeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  async getHomes(filters: GetHomesParam): Promise<HomeResponseDto[]> {
    const homes = await this.prismaService.home.findMany({
      select: {
        id: true,
        address: true,
        city: true,
        price: true,
        property_type: true,
        number_of_bathrooms: true,
        number_of_bedrooms: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: filters,
    });

    if (!homes.length) {
      throw new NotFoundException('Дома с такими параметрами не найдены');
    }

    return homes.map((home) => {
      const fetchHome = new HomeResponseDto({
        id: home.id,
        address: home.address,
        city: home.address,
        price: home.price,
        property_type: home.property_type,
        number_of_bathrooms: home.number_of_bathrooms,
        number_of_bedrooms: home.number_of_bedrooms,
        image: home?.images[0]?.url,
      });
      return new HomeResponseDto(fetchHome);
    });
  }

  async getConcreteHome(id: string) {
    const home = await this.prismaService.home.findFirst({
      where: {
        id: +id,
      },
    });

    if (!home) {
      throw new NotFoundException('Дом с данным id не найден');
    }

    return new HomeResponseDto(home);
  }

  async createHome(
    {
      address,
      numberOfBedrooms,
      numberOfBathrooms,
      city,
      price,
      images,
      landSize,
      propertyType,
    }: HomeRequestDto,
    userId: number,
  ) {
    const newHome = await this.prismaService.home.create({
      data: {
        address,
        city,
        price,
        land_size: landSize,
        property_type: propertyType,
        number_of_bedrooms: numberOfBedrooms,
        number_of_bathrooms: numberOfBathrooms,
        realtor_id: userId,
      },
    });

    const homeImages = images.map((image) => {
      return { ...image, home_id: newHome.id };
    });

    const imagesCreated = await this.prismaService.image.createMany({
      data: homeImages,
    });

    return new HomeResponseDto(newHome);
  }

  async updateHome(
    id: number,
    {
      numberOfBathrooms,
      numberOfBedrooms,
      address,
      landSize,
      propertyType,
      price,
      city,
    }: UpdateHomeDto,
  ) {
    const home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });

    if (!home) {
      throw new NotFoundException('Дом с данным id не найден');
    }

    const updatedHome = await this.prismaService.home.update({
      where: {
        id,
      },
      data: {
        address,
        price,
        city,
        number_of_bedrooms: numberOfBedrooms,
        number_of_bathrooms: numberOfBathrooms,
        land_size: landSize,
        property_type: propertyType,
      },
    });

    return new HomeResponseDto(updatedHome);
  }

  async deleteHome(id: number) {
    const home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });

    if (!home) {
      throw new NotFoundException('Дом с данным id не найден');
    }

    const deletedHome = await this.prismaService.home.delete({
      where: {
        id,
      },
    });

    return new HomeResponseDto(deletedHome);
  }

  async getRealtorByIdHome(id: number) {
    const home_info = await this.prismaService.home.findUnique({
      where: {
        id,
      },
      select: {
        realtor: {
          select: {
            name: true,
            email: true,
            phone: true,
            id: true,
          },
        },
      },
    });

    if (!home_info) {
      throw new NotFoundException('Дом с данным id не найден');
    }

    return home_info.realtor;
  }

  async inquire(buyer: UserInfoToken, homeId: number, message: string) {
    const realtor = await this.getRealtorByIdHome(homeId);

    const newMessage = await this.prismaService.message.create({
      data: {
        realtor_id: realtor.id,
        buyer_id: buyer.id,
        home_id: homeId,
        message,
      },
    });
    return newMessage;
  }

  async getMessagesByHomeId(homeId: number) {
    const messages = await this.prismaService.message.findMany({
      where: {
        home_id: homeId,
      },
      select: {
        message: true,
        buyer: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });
    return messages;
  }

  async getFilesInHome() {
    return [1, 2, 3];
  }

  async createFilesAtHome(image: unknown, homeId: number) {
    const { fileName } = await this.filesService.createFile(image);
    const newImage = await this.prismaService.image.create({
      data: {
        url: `${fileName}`,
        home_id: homeId,
      },
    });

    return newImage;
  }
}
