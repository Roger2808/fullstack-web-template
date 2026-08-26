import { User as PrismaUser } from '@prisma/client';
import { User } from '../domain/user.entity';
import { Email } from '../domain/value-objects/email';
import { UniqueEntityId } from '../../../shared/domain/entity';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.reconstitute(
      {
        clinicId: raw.clinicId,
        email: Email.create(raw.email),
        passwordHash: raw.passwordHash,
        fullName: raw.fullName,
        role: raw.role,
        active: raw.active,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }
}
