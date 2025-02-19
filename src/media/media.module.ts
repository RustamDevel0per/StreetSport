import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Media } from './entities/media.entity';
import { SportVenue } from '../sprot-venue/entities/sprot-venue.entity';

@Module({
  imports:[SequelizeModule.forFeature([Media , SportVenue])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
