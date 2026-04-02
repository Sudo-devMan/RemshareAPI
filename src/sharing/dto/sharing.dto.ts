import { IsArray, IsEmail, IsOptional, IsString } from "class-validator";

export class ShareFileDto {
    @IsString()
    @IsOptional()
    note: string

    @IsString({message: "sharing password is needed for extra protection"})
    password: string

    @IsString()
    @IsEmail()
    receiverEmail: string

    @IsString()
    @IsEmail()
    senderEmail: string

    
}
