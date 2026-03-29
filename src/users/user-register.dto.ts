import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
    @IsString()
    username: string

    @IsString()
    email: string

    @IsString()
    password: string
}