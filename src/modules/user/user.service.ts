import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enum/userRole.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userData: any) {
    console.log(userData);

    try {
      const user = await this.userRepository.findOneBy({ name: userData.name });
      if (user) throw new BadRequestException('Este usuario ya existe');

      const hassedPas = await bcrypt.hash(userData.password, 10);

      const newUser = this.userRepository.create({
        name: userData.name,
        email: userData.email,
        password: hassedPas,
        role: UserRole.ADMIN,
        features: ['LOCAL', 'RUTA'],
      });

      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      return `error al crear usuario  ${error}`;
    }
  }

  async createEmployee(userData, adminPayload) {
    const adminUser = await this.userRepository.findOne({
      where: { id: adminPayload },
    });

    if (!adminUser) {
      throw new NotFoundException('Este administrador no existe');
    }

    const newEmployee = this.userRepository.create({
      name: userData.name,
      email: userData.email ? userData : null,
      password: await bcrypt.hash(userData.password, 10),
      role: UserRole.EMPLOYEE,
      admin: adminUser,
      features: adminUser.features,
    });

    return await this.userRepository.save(newEmployee);
  }
}
