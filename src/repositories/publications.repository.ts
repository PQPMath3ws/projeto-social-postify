import { publications } from '@prisma/client';

export abstract class PublicationsRepository {
  abstract getMany(user_id: string): Promise<publications[]>;

  abstract getFirstWithTitle(title: string): Promise<publications>;

  abstract createUserPost(
    image: string,
    title: string,
    text: string,
    dateToPublish: string,
    published: boolean,
    socialMedia: string,
    user_id: string,
  ): Promise<void>;
}
