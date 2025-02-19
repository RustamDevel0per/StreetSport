import { Module } from "@nestjs/common";
import { SprotVenueService } from "./sprot-venue.service";
import { SprotVenueController } from "./sprot-venue.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { SportVenue } from "./entities/sprot-venue.entity";
import { Region } from "../region/entities/region.entity";
import { District } from "../district/entities/district.entity";
import { User } from "../users/model/user.model";

@Module({
  imports: [SequelizeModule.forFeature([SportVenue, Region, District, User])],
  controllers: [SprotVenueController],
  providers: [SprotVenueService],
})
export class SprotVenueModule {}
