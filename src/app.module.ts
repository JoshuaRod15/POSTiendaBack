import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entity/User.entity';
import { Product } from './entity/Product.entity';
import { Ticket } from './entity/Ticket.entity';
import { ProductModule } from './modules/product/product.module';
import { ProductService } from './modules/product/product.service';
import { ProductController } from './modules/product/product.controller';
import { TicketProducts } from './entity/TicketProducts';
import { TicketController } from './modules/ticket/ticket.controller';
import { TicketService } from './modules/ticket/ticket.service';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { JwtStrategy } from './modules/auth/jwt.strategy';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.dev' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    TypeOrmModule.forFeature([User, Product, Ticket, TicketProducts]),
    ProductModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [
    AppController,
    ProductController,
    TicketController,
    UserController,
    AuthController,
  ],
  providers: [
    AppService,
    ProductService,
    TicketService,
    UserService,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
