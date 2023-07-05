import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthenticationRepository } from '../repositories/authentication.repository';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private authenticationRepository: AuthenticationRepository,
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(email: string, password: string) {
    const user = await this.usersRepository.get(email);

    if (!user)
      throw new HttpException(
        'Email e/ou senha inválidos!',
        HttpStatus.UNAUTHORIZED,
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new HttpException(
        'Email e/ou senha inválidos!',
        HttpStatus.UNAUTHORIZED,
      );

    const token = await this.jwtService.signAsync({ email: user.email });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 2);

    await this.authenticationRepository.create(token, user.id, expiresAt);

    return {
      token,
    };
  }
}
