import { Injectable } from '@nestjs/common';
import { CreateOwnerLicenseDto } from './dto/create-owner_license.dto';
import { UpdateOwnerLicenseDto } from './dto/update-owner_license.dto';
import { FileService } from '../file/file.service';
import { OwnerLicense } from './model/owner_license.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OwnerLicenseService {
  constructor(
    @InjectModel(OwnerLicense) private ownerModel: typeof OwnerLicense,
    private readonly fileService: FileService
  ) {}
  async create(createOwnerLicenseDto: CreateOwnerLicenseDto, image: any) {
    const fileName = await this.fileService.saveFile(image);
    return this.ownerModel.create({ ...createOwnerLicenseDto, license: fileName });
  }

  findAll() {
    return this.ownerModel.findAll()
  }

  findOne(id: number) {
    return `This action returns a #${id} ownerLicense`;
  }

  update(id: number, updateOwnerLicenseDto: UpdateOwnerLicenseDto) {
    return `This action updates a #${id} ownerLicense`;
  }

  remove(id: number) {
    return `This action removes a #${id} ownerLicense`;
  }
}
