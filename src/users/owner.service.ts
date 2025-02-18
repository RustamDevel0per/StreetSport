import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { MailService } from '../mail/mail.service';
import { FindUserDto } from './dto/find-user.dto';
import { Op, where } from 'sequelize';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

 
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
      is_owner:true
    });
    return newUser;
  }


  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updateUser = await this.userModel.update(
      { hashed_refresh_token },
      {
        where: { id },
      }
    );
    return updateUser;
  }






  async findUser(findUserDto: FindUserDto) {
    const { name, email, phone } = findUserDto;
    const where = {};
    if (name) {
      where["name"] = {
        [Op.iLike]: `%${name}`,
      };
    }
    if (email) {
      where["email"] = {
        [Op.iLike]: `%${email}`,
      };
    }
    if (phone) {
      where["phone"] = {
        [Op.like]: `%${phone}`,
      };

      console.log(where);
      const users = await this.userModel.findAll({ where });

      if (!users) {
        throw new NotFoundException("Not found");
      }
      return users;
    }
  }



  findAll() {
    return this.userModel.findAll()
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email },
      include: { all: true },
    });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
