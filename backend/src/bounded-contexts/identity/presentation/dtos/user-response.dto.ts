import { User } from '../../domain/user.entity';

export class UserResponseDto {
  id: string;
  clinicId: string;
  email: string;
  fullName: string;
  role: string;
  active: boolean;

  static fromDomain(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id.toString();
    dto.clinicId = user.clinicId;
    dto.email = user.email.value;
    dto.fullName = user.fullName;
    dto.role = user.role;
    dto.active = user.active;
    return dto;
  }
}
