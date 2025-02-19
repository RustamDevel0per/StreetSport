import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSportVenueDto } from "./dto/create-sprot-venue.dto";
import { UpdateSprotVenueDto } from "./dto/update-sprot-venue.dto";
import { InjectModel } from "@nestjs/sequelize";
import { SportVenue } from "./entities/sprot-venue.entity";

@Injectable()
export class SprotVenueService {
  constructor(
    @InjectModel(SportVenue) private sportVenueModel: typeof SportVenue
  ) {}
  create(createSprotVenueDto: CreateSportVenueDto) {
    return this.sportVenueModel.create(createSprotVenueDto);
  }

  findAll() {
    return this.sportVenueModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const venue = await this.sportVenueModel.findByPk(id);
    if (!venue) {
      throw new NotFoundException();
    }
    return venue;
  }

  async update(id: number, updateSprotVenueDto: UpdateSprotVenueDto) {
    const venue = await this.sportVenueModel.findByPk(id);
    if (!venue) {
      throw new NotFoundException();
    }
    await venue.update({ ...updateSprotVenueDto });
    await venue.save();
    return venue;
  }

  async remove(id: number) {
    const venue = await this.sportVenueModel.destroy({ where: { id } });
    if (!venue) {
      throw new NotFoundException();
    }

    return { message: "Delted succefully" };
  }
}
