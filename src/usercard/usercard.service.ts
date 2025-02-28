import { Injectable } from '@nestjs/common';
import { CreateUsercardDto } from './dto/create-usercard.dto';
import { UpdateUsercardDto } from './dto/update-usercard.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Usercard } from './models/usercard.model';

@Injectable()
export class UsercardService {

  constructor(
    @InjectModel(Usercard) private readonly userCardService: typeof Usercard
  ){}

  create(createUsercardDto: CreateUsercardDto) {
    return this.userCardService.create(createUsercardDto)
  }

  findAll() {
    return this.userCardService.findAll()
  }
  
  findOne(id: number) {
    return this.userCardService.findByPk(id)
  }
  
  update(id: number, updateUsercardDto: UpdateUsercardDto) {
    return this.userCardService.update(updateUsercardDto, {where:{id}, returning:true})
  }
  
  remove(id: number) {
    return this.userCardService.destroy({where:{id}})
  }
}
