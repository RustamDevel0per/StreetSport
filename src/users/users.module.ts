import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { SmsModule } from '../sms/sms.module';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';


@Module({
  imports:[
    SmsModule,
    MailModule,
    SequelizeModule.forFeature([User])],
  controllers: [UsersController,OwnerController],
  providers: [UsersService,OwnerService],
  exports:[UsersService,OwnerService]
})
export class UsersModule {}
