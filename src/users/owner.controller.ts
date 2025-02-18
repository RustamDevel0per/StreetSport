import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from '../guard/user.guard';
import { FindUserDto } from './dto/find-user.dto';
import { PhoneUserDto } from './dto/phono-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OwnerSelfGuard } from '../guard/owner.self.guard';
import { OwnerGuard } from '../guard/owner.guard';
import { OwnerService } from './owner.service';

@Controller("owner")
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.ownerService.create(createUserDto);
  }


  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @Post("find-user")
  FindUser(@Body() findUserDto: FindUserDto) {
    return this.ownerService.findUser(findUserDto);
  }

  // @HttpCode(200)
  // @Post("newotp")
  // newOtp(@Body() phoneUserDto: PhoneUserDto) {
  //   return this.ownerService.newOtp(phoneUserDto);
  // }

  // @HttpCode(200)
  // @Post("verifyotp")
  // newVerifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
  //   return this.ownerService.verifyOtp(verifyOtpDto);
  // }

  @UseGuards(OwnerSelfGuard)
  @UseGuards(OwnerGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ownerService.findOne(+id);
  }

  @UseGuards(OwnerSelfGuard)
  @UseGuards(OwnerGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.ownerService.update(+id, updateUserDto);
  }

  @UseGuards(OwnerSelfGuard)
  @UseGuards(OwnerGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ownerService.remove(+id);
  }
}
