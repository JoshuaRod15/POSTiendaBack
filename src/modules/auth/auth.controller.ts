// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UserRole } from 'src/enum/userRole.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data);

    if (user.role !== UserRole.ADMIN || user.role !== UserRole.EMPLOYEE) {
      throw new UnauthorizedException(
        'No tienes permiso de acceder al POS local',
      );
    }
    return this.authService.login(user);
  }

  @Post('login/deliveyr')
  async loginDelivery(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data);
    if (user.role !== UserRole.ADMIN || user.role !== UserRole.DELIVERY) {
      throw new UnauthorizedException('Acceso exclisivo para repartidores');
    }
    return this.authService.login(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verifyToken(@Req() req: any) {
    return {
      message: 'Token valido',
      user: req.user,
    };
  }
}
