import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { OwnerLicenseService } from './owner_license.service';
import { CreateOwnerLicenseDto } from './dto/create-owner_license.dto';
import { UpdateOwnerLicenseDto } from './dto/update-owner_license.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("owner-license")
export class OwnerLicenseController {
  constructor(private readonly ownerLicenseService: OwnerLicenseService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createOwnerLicenseDto: CreateOwnerLicenseDto,
    @UploadedFile() image: any
  ) {
    return this.ownerLicenseService.create(createOwnerLicenseDto,image);
  }

  @Get()
  findAll() {
    return this.ownerLicenseService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ownerLicenseService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateOwnerLicenseDto: UpdateOwnerLicenseDto
  ) {
    return this.ownerLicenseService.update(+id, updateOwnerLicenseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ownerLicenseService.remove(+id);
  }
}
