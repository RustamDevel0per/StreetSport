import { PartialType } from '@nestjs/swagger';
import { CreateOwnerLicenseDto } from './create-owner_license.dto';

export class UpdateOwnerLicenseDto extends PartialType(CreateOwnerLicenseDto) {}
