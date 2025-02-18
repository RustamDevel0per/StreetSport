import { Module } from '@nestjs/common';
import { UsercardService } from './usercard.service';
import { UsercardController } from './usercard.controller';

@Module({
  controllers: [UsercardController],
  providers: [UsercardService],
})
export class UsercardModule {}
