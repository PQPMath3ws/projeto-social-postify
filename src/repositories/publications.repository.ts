import { publications } from '@prisma/client';

export abstract class PublicationsRepository {
  abstract get(user_id: string): Promise<publications[]>;
}
