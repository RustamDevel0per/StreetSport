import { Body, Controller, HttpCode, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import {  Response } from "express";
import { CookieGetter } from "../decorators/cookie-getter.decorator";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: "Yangi foydalanuvchini ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 401,
    description: "Ro'yxatdan o'tgan Foydalanivchi",
    type: String,
  })
  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post("signup-owner")
  async signUpOwner(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpOwner(createUserDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @HttpCode(200)
  @Post("signout")
  signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
