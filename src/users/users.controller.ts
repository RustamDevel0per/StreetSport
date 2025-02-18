import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from '../guard/user.guard';
import { UserSelfGuard } from '../guard/user.self.guard';
import { FindUserDto } from './dto/find-user.dto';
import { PhoneUserDto } from './dto/phono-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Post("find-user")
  FindUser(@Body() findUserDto: FindUserDto) {
    return this.usersService.findUser(findUserDto);
  }

  // @HttpCode(200)
  // @Post("newotp")
  // newOtp(@Body() phoneUserDto: PhoneUserDto) {
  //   return this.usersService.newOtp(phoneUserDto);
  // }

  // @HttpCode(200)
  // @Post("verifyotp")
  // newVerifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
  //   return this.usersService.verifyOtp(verifyOtpDto);
  // }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
