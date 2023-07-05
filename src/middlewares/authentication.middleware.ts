import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

import { AuthenticationRepository } from '../repositories/authentication.repository';

interface RequestWithUserId extends Request {
  user_id: string;
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private authenticationRepository: AuthenticationRepository,
  ) {}

  async use(req: RequestWithUserId, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization)
      throw new HttpException(
        'Usuário não autenticado!',
        HttpStatus.UNAUTHORIZED,
      );

    const splitted = authorization.split(' ');

    if (splitted.length !== 2 || splitted[0] !== 'Bearer')
      throw new HttpException(
        'Authentication inválida!',
        HttpStatus.UNAUTHORIZED,
      );

    try {
      await this.jwtService.verifyAsync(splitted[1]);

      const session = await this.authenticationRepository.get(splitted[1]);

      if (!session)
        throw new HttpException(
          'Token de autenticação inválido!',
          HttpStatus.UNAUTHORIZED,
        );

      req.user_id = session.user_id;

      return next();
    } catch (error: any) {
      if (error.name === 'JsonWebTokenError')
        throw new HttpException(
          'Token de autenticação inválido!',
          HttpStatus.UNAUTHORIZED,
        );

      throw new HttpException(
        'Erro ao validar token!',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
