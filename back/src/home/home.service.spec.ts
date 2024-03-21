import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from './home.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PropertyType } from '@prisma/client';

describe('Testing HomeService', () => {
  let service: HomeService;
  let prismaService: PrismaService;

  const GetHomesParams = {
    city: 'Moscow',
    price: {
      gte: 0,
      lte: 100000000000,
    },
    property_type: PropertyType.RESIDENTIAL,
  };

  const mockGetHomes = [
    {
      id: 4,
      address: 'Russian street 4',
      city: 'Russian street 4',
      price: 4800,
      image: 'img2',
      numberOfBedrooms: 2,
      numberOfBathrooms: 2,
      propertyType: PropertyType.RESIDENTIAL,
      images: [
        {
          url: 'src1',
        },
      ],
    },
    {
      id: 5,
      address: 'Russian street 4',
      city: 'Russian street 4',
      price: 4800,
      image: 'img2',
      numberOfBedrooms: 2,
      numberOfBathrooms: 2,
      propertyType: PropertyType.RESIDENTIAL,
      images: [
        {
          url: 'src2',
        },
      ],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        ConfigService,
        {
          provide: PrismaService,
          useValue: {
            home: {
              findMany: jest.fn().mockReturnValue(mockGetHomes),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('HomeService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getHomes - should call prisma home.findMany', () => {
    const mockPrismaFindManyHome = jest.fn();
    jest
      .spyOn(prismaService.home, 'findMany')
      .mockImplementation(mockPrismaFindManyHome);
  });
});
