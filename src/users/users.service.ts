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
import { SmsService } from '../sms/sms.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly smsService: SmsService
  ) {}

 
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
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

  // async newOtp(phoneUserDto: PhoneUserDto) {
  //   const phone_number = phoneUserDto.phone;
  //   const email="rustambek.bozorov@mail.ru"
  //   const password = "NzEDkMUaGgNEeW8ZqxbcTIyBYPmPSWUFV8hihTlJ";
  //   const otp = otpGenerator.generate(4, {
  //     upperCaseAlphabets: false,
  //     lowerCaseAlphabets: false,
  //     specialChars: false,
  //   });

  //   const token= await this.smsService.getToken(email,password)
  //   console.log(token);
    
    

  //   // const response= await this.smsService.sendSms(phone_number,otp)
  //   // if(response.status!==200){
  //   //   throw new ServiceUnavailableException("OTP yuborishda xatolik")
  //   // }

  //   // const message=`OTP code has been  send to ****`+phone_number.slice(phone_number.length-4)

  //   const now= new Date()
  //   const expiration_time=AddMinutesToDate(now,5)
  //   await this.otpModel.destroy({where:{phone_number}})
  //   const newOtpData= await this.otpModel.create({
  //     id:uuid.v4(),
  //     otp,
  //     phone_number,
  //     expiration_time
  //   })
  //   const deatils={
  //     timestamp:now,
  //     phone_number,
  //     otp_id:newOtpData.id,
  //     // messageSms:message
  //   }
  //   const encodedData=await encode(JSON.stringify(deatils))
  //   return {
  //     message: "OTP botga yuborildi",
  //     verification_key: encodedData,
  //   };
  // }

  // async verifyOtp(verifyOtpDto:VerifyOtpDto){
  //   const {verification_key,phone:phone_number,otp}=verifyOtpDto
  //   const currentDate=new Date()
  //   const decodedData= await decode(verification_key)
  //   const deatils=JSON.parse(decodedData)
  //   if(deatils.phone_number!=phone_number){
  //     throw new BadRequestException("Otp bu raqamga yuborilmagan")
  //   }
  //   const resultOtp=await this.otpModel.findByPk(deatils.otp_id)
  //   if(resultOtp==null){
  //     throw new BadRequestException("Bunday otp mavjud emas")
  //   }

  //    if (resultOtp.verified) {
  //      throw new BadRequestException("Bu otp tekshirib bo'lingan");
  //    }

  //    if (resultOtp.expriation_date > currentDate) {
  //      throw new BadRequestException("Bu otpning vaqti o'tgan");
  //    }
  //     if (resultOtp.otp != otp) {
  //       throw new BadRequestException("Otp mos emas");
  //     }
  //     const findUser= await this.userModel.update({is_owner:true},{where:{phone:phone_number},returning:true})
  //     if(!findUser[1][0]){
  //       throw new BadRequestException("Bunday foydalanuvhci mavjud emas")
  //     }
  //     await this.otpModel.update(
  //       {verified:true},
  //      { where:{id:deatils.otp_id}}
  //     )
  //       return {
  //         message:"Tabriklayman ro'yxatdan o'tdingiz"
  //       }
  //   }



  findAll() {
    return `This action returns all users`;
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
