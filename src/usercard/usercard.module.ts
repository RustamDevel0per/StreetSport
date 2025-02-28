import { Module } from '@nestjs/common';
import { UsercardService } from './usercard.service';
import { UsercardController } from './usercard.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usercard } from './models/usercard.model';

@Module({
  imports:[SequelizeModule.forFeature([Usercard])],
  controllers: [UsercardController],
  providers: [UsercardService],
})
export class UsercardModule {}
