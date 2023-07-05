import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticateUserBody } from '../dtos/authentication.body';

import { AuthenticationService } from '../services/authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signin')
  async loginUser(@Body() body: AuthenticateUserBody) {
    const { email, password } = body;

    return await this.authenticationService.authenticateUser(email, password);
  }
}
