import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/RolesGuard.guard';
import { Roles } from 'src/help/roles.decorator';
import { UserRole } from 'src/enum/userRole.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData) {
    return this.userService.createUser(userData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('/createEmployee')
  async createEmployee(@Body() employeData, @Req() req: any) {
    const adminId = req.user['userId'];
    return this.userService.createEmployee(employeData, adminId);
  }
}
