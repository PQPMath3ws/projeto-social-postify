import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PublicationsRepository } from '../repositories/publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async getUserPublications(user_id: string) {
    return await this.publicationsRepository.getMany(user_id);
  }

  async createUserPublication(
    image: string,
    title: string,
    text: string,
    dateToPublish: string,
    published: boolean,
    socialMedia: string,
    user_id: string,
  ) {
    const post = await this.publicationsRepository.getFirstWithTitle(title);

    if (post)
      throw new HttpException(
        `Post com título: "${title}" existente.`,
        HttpStatus.CONFLICT,
      );

    await this.publicationsRepository.createUserPost(
      image,
      title,
      text,
      dateToPublish,
      published,
      socialMedia,
      user_id,
    );

    return 'Post criado com sucesso!';
  }
}
