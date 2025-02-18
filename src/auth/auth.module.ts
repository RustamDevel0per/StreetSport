import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/model/user.model';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { OwnerService } from '../users/owner.service';

@Module({
  imports:[
    UsersModule,
    JwtModule.register({global:true})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
