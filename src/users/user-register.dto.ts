import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserRegisterDto {
    @IsString()
    username: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    @IsOptional()
    profilePictureUrl: string
}

export class UserUpdateDto extends PartialType(UserRegisterDto) {}
