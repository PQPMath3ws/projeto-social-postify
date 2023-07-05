import { sessions } from '@prisma/client';

export abstract class AuthenticationRepository {
  abstract create(
    token: string,
    user_id: string,
    expiresAt: Date,
  ): Promise<void>;

  abstract get(token: string): Promise<sessions>;
}
