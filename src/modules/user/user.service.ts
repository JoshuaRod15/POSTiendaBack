import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
      });

      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      return `error al crear usuario  ${error}`;
    }
  }
}
