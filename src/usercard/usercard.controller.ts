import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsercardService } from './usercard.service';
import { CreateUsercardDto } from './dto/create-usercard.dto';
import { UpdateUsercardDto } from './dto/update-usercard.dto';

@Controller('usercard')
export class UsercardController {
  constructor(private readonly usercardService: UsercardService) {}

  @Post()
  create(@Body() createUsercardDto: CreateUsercardDto) {
    return this.usercardService.create(createUsercardDto);
  }

  @Get()
  findAll() {
    return this.usercardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usercardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsercardDto: UpdateUsercardDto) {
    return this.usercardService.update(+id, updateUsercardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usercardService.remove(+id);
  }
}
