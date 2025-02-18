import { PartialType } from '@nestjs/swagger';
import { CreateUsercardDto } from './create-usercard.dto';

export class UpdateUsercardDto extends PartialType(CreateUsercardDto) {}
