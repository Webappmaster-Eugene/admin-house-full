import { HttpException } from '@nestjs/common';

abstract class AuthenticationException extends HttpException {
  public readonly type = 'authentication';
}

abstract class NotAllowedException extends HttpException {
  public readonly type = 'authorization';
}

abstract class NotFoundException extends HttpException {
  public readonly type = 'not_found';
}

abstract class ClientException extends HttpException {
  public readonly type = 'client';
}

abstract class ServerException extends HttpException {
  public readonly type = 'server';
}
