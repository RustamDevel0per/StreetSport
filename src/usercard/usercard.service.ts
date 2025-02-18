import { Injectable } from '@nestjs/common';
import { CreateUsercardDto } from './dto/create-usercard.dto';
import { UpdateUsercardDto } from './dto/update-usercard.dto';

@Injectable()
export class UsercardService {
  create(createUsercardDto: CreateUsercardDto) {
    return 'This action adds a new usercard';
  }

  findAll() {
    return `This action returns all usercard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usercard`;
  }

  update(id: number, updateUsercardDto: UpdateUsercardDto) {
    return `This action updates a #${id} usercard`;
  }

  remove(id: number) {
    return `This action removes a #${id} usercard`;
  }
}
