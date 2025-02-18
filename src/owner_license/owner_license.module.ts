import { Module } from '@nestjs/common';
import { OwnerLicenseService } from './owner_license.service';
import { OwnerLicenseController } from './owner_license.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnerLicense } from './model/owner_license.model';
import { FileService } from '../file/file.service';

@Module({
  imports:[SequelizeModule.forFeature([OwnerLicense])],
  controllers: [OwnerLicenseController],
  providers: [OwnerLicenseService,FileService],
})
export class OwnerLicenseModule {}
