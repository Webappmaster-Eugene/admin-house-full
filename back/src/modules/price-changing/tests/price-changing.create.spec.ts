import 'reflect-metadata';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { RouteParamtypes } from '@nestjs/common/enums/route-paramtypes.enum';

import { PriceChangingController } from '../price-changing.controller';
import { PriceChangingRepository } from '../price-changing.repository';
import { IPriceChangingService } from '../types/price-changing.service.interface';
import { IPrismaService } from '../../../common/types/main/prisma.interface';
import { ILogger } from '../../../common/types/main/logger.interface';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { PriceChangingCreateRequestDto } from '../dto/controller/create-price-changing.dto';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';

const MATERIAL_UUID = '11111111-1111-4111-8111-111111111111';
const USER_UUID = '22222222-2222-4222-8222-222222222222';
const PRICE_CHANGING_UUID = '33333333-3333-4333-8333-333333333333';

type RouteArgMetadata = Record<string, { index: number; data?: string; pipes?: unknown[] }>;

const dto = { newPrice: 150, oldPrice: 100, source: 'Поставщик', comment: 'Подорожание' } as PriceChangingCreateRequestDto;
const urlParams = { url: '/price-changing', method: 'POST' } as unknown as IUrlParams;
const jwtPayload = { uuid: USER_UUID } as IJWTPayload;

function buildLogger(): ILogger {
  return { log: jest.fn(), info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() } as unknown as ILogger;
}

describe('Создание изменения цены (PriceChanging)', () => {
  it('should bind current user via @User() and materialId via @Param() in createEP', () => {
    // Arrange
    const metadata: RouteArgMetadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, PriceChangingController, 'createEP');

    // Act
    const byIndex = new Map(Object.entries(metadata).map(([key, value]) => [value.index, { key, data: value.data }]));

    // Assert: все 4 аргумента привязаны (без декоратора Nest передаёт undefined → TypeError на userInfoFromJWT.uuid)
    expect(byIndex.size).toBe(4);
    expect(byIndex.get(0)?.key).toBe(`${RouteParamtypes.BODY}:0`);
    expect(byIndex.get(2)?.key).toMatch(/__customRouteArgs__/);
    expect(byIndex.get(3)).toEqual({ key: `${RouteParamtypes.PARAM}:3`, data: 'materialId' });
  });

  it('should pass materialId before the author uuid to the service', async () => {
    // Arrange
    const create = jest.fn().mockResolvedValue({ ok: true, data: { uuid: PRICE_CHANGING_UUID } });
    const service = { create } as unknown as IPriceChangingService;
    const controller = new PriceChangingController(service, buildLogger());

    // Act
    await controller.createEP(dto, urlParams, jwtPayload, MATERIAL_UUID);

    // Assert: сигнатура сервиса — (dto, materialId, changedById)
    expect(create).toHaveBeenCalledWith(dto, MATERIAL_UUID, USER_UUID);
  });

  it('should persist material and author of the price change', async () => {
    // Arrange
    const prismaCreate = jest.fn().mockResolvedValue({
      uuid: PRICE_CHANGING_UUID,
      ...dto,
      materialUuid: MATERIAL_UUID,
      lastChangeByUserUuid: USER_UUID,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const prisma = { priceChanging: { create: prismaCreate } } as unknown as IPrismaService;
    const repository = new PriceChangingRepository(prisma);

    // Act
    await repository.create(dto, MATERIAL_UUID, USER_UUID);

    // Assert
    expect(prismaCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ newPrice: 150, oldPrice: 100, materialUuid: MATERIAL_UUID, lastChangeByUserUuid: USER_UUID }),
      }),
    );
  });
});
