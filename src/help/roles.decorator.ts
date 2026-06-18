import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/enum/userRole.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('role', roles);
