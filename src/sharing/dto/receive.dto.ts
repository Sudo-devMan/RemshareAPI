import { IsEmail, IsString } from "class-validator"

export class ReceiveDto {
    @IsString()
    @IsEmail()
    receiverEmail: string

    @IsString()
    password: string
}
