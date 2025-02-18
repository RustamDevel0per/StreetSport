import { IsEmail, IsEmpty, IsStrongPassword } from "class-validator"

export class SignInDto{
    @IsEmail()
    readonly email:string
    readonly password:string
    readonly value:string

}