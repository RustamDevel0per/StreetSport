import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Media } from "./entities/media.entity";
import { TypeOptions } from "class-transformer";

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private readonly mediaModel: typeof Media) {}
  create(createMediaDto: CreateMediaDto) {
    return this.mediaModel.create(createMediaDto);
  }

  findAll() {
    return this.mediaModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const url = await this.mediaModel.findByPk(id);
    if (!url) {
      throw new NotFoundException();
    }
    return url;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const url = await this.mediaModel.findByPk(id);
    if (!url) {
      throw new NotFoundException();
    }
    await url.update({ ...updateMediaDto });
    await url.save();
    return url;
  }

  async remove(id: number) {
    const url = await this.mediaModel.destroy({ where: { id } });
    if (!url) {
      throw new NotFoundException();
    }
    return { message: "Succefully deleted" };
  }
}
