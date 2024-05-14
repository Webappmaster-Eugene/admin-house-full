import { UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export function existenceUserEntityHandler(findedUser: unknown): UserEntity {
  if (findedUser) {
    return new UserEntity(findedUser);
  } else {
    throw new UnauthorizedException({
      message: `User credentials are wrong`,
      description: 'Failed to get user with these credentials',
    });
  }
}
