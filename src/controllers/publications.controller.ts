import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { PublicationsService } from '../services/publications.service';

interface RequestWithUserId extends Request {
  user_id: string;
}

@Controller()
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Get('publications')
  async getPublications(@Req() request: RequestWithUserId) {
    return this.publicationsService.getUserPublications(request.user_id);
  }
}
