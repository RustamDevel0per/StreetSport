import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from "bcrypt"
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/model/user.model';
import { OwnerService } from '../users/owner.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly ownerService: OwnerService
  ) {}

  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const {password,confirm_password}= createUserDto
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new BadRequestException("User exists");
    }

    if(password!=confirm_password){
      throw new BadRequestException("Passwords does not match")
    }
    
    const newUser = await this.userService.create(createUserDto);
    const response = {
      message:
        "Tabriklayman tizimga qo'shildingiz. Akkuntni faollashtirish uchun pochtangizga kiring",
      userId: newUser.id,
    };
    return response;
  }

  async signUpOwner(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;

    const candidate = await this.userService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new BadRequestException("User exists");
    }
    if (password != confirm_password) {
      throw new BadRequestException("Passwords does not match");
    }
    const newUser = await this.ownerService.create(createUserDto);
    const response = {
      message:
        "Tabriklayman tizimga qo'shildingiz. Akkuntni faollashtirish uchun pochtangizga kiring",
      userId: newUser.id,
    };
    return response;
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.userService.findUserByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException("Email or password incorrect");
    }
    if (!user.is_active) {
      throw new BadRequestException("User is not active");
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.hashed_password
    );
    if (!isValidPassword) {
      throw new UnauthorizedException("Email or password incorrect");
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.userService.updateRefreshToken(
      user.id,
      hashed_refresh_token
    );
    if (!updateUser) {
      throw new InternalServerErrorException("Tokenni saqlashda xatolik");
    }

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "User logged in",
      userId: user.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("User not verified");
    }
    const hashed_refresh_token = null;
    await this.userService.updateRefreshToken(
      userData.id,
      hashed_refresh_token
    );
    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };
    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (userId != decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan foydalanuvchi");
    }
    const user = await this.userService.findOne(userId);

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException("user not found");
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token
    );
    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.userService.updateRefreshToken(
      user.id,
      hashed_refresh_token
    );
    if (!updateUser) {
      throw new InternalServerErrorException("Tokenni saqlashda xatolik");
    }

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "User refreshed",
      userId: user.id,
      access_token: tokens.access_token,
    };
    return response;
  }
}