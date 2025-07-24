// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data);
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
