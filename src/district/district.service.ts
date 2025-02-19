import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/sequelize";
import { District } from "./entities/district.entity";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtModel: typeof District
  ) {}
  create(createDistrictDto: CreateDistrictDto) {
    return this.districtModel.create(createDistrictDto);
  }

  findAll() {
    return this.districtModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const district = await this.districtModel.findByPk(id);
    if (!district) {
      throw new NotFoundException();
    }
    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.districtModel.findByPk(id);
    if (!district) {
      throw new NotFoundException();
    }

    await district.update({ ...updateDistrictDto });
    await district.save();
    return district;
  }

  async remove(id: number) {
    const district = await this.districtModel.destroy({ where: { id } });
    if (!district) {
      throw new NotFoundException();
    }
    return { message: "Succesfully  deleted" };
  }
}
