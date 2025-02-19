import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Region } from "./entities/region.entity";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionModel: typeof Region
  ) {}

  create(createRegionDto: CreateRegionDto) {
    return this.regionModel.create(createRegionDto);
  }

  findAll() {
    return this.regionModel.findAll();
  }

  async findOne(id: number) {
    const region = await this.regionModel.findByPk(id);
    if (!region) {
      throw new NotFoundException();
    }
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionModel.findByPk(id);
    if (!region) {
      throw new NotFoundException();
    }
    await region.update({ ...updateRegionDto });
    await region.save();

    return region;
  }

  async remove(id: number) {
    const region = await this.regionModel.destroy({ where: { id } });

    if (!region) {
      throw new NotFoundException();
    }

    return { message: "Succefully deleted" };
  }
}
