import { Module } from "@nestjs/common";
import { DistrictService } from "./district.service";
import { DistrictController } from "./district.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { District } from "./entities/district.entity";
import { Region } from "../region/entities/region.entity";

@Module({
  imports: [SequelizeModule.forFeature([District, Region])],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
