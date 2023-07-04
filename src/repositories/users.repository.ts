import { users } from '@prisma/client';

export abstract class UsersRepository {
  abstract get(email: string): Promise<users>;

  abstract create(
    name: string,
    email: string,
    password: string,
    avatar: string,
  ): Promise<void>;
}
