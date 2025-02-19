import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SprotVenueService } from './sprot-venue.service';
import { CreateSportVenueDto } from './dto/create-sprot-venue.dto';
import { UpdateSprotVenueDto } from './dto/update-sprot-venue.dto';

@Controller("sprot-venue")
export class SprotVenueController {
  constructor(private readonly sprotVenueService: SprotVenueService) {}

  @Post()
  create(@Body() createSprotVenueDto: CreateSportVenueDto) {
    return this.sprotVenueService.create(createSprotVenueDto);
  }

  @Get()
  findAll() {
    return this.sprotVenueService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sprotVenueService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSprotVenueDto: UpdateSprotVenueDto
  ) {
    return this.sprotVenueService.update(+id, updateSprotVenueDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sprotVenueService.remove(+id);
  }
}
