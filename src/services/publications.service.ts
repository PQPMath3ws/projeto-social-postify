import { Injectable } from '@nestjs/common';

import { PublicationsRepository } from '../repositories/publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async getUserPublications(user_id: string) {
    return await this.publicationsRepository.get(user_id);
  }
}
