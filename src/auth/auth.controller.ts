import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './req-user.decorator';
import { UserRegisterDto, UserUpdateDto } from 'src/users/user-register.dto';
import { Public } from './public.decorator';
import { User, UserBaseDto } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('users')
    allUsers() {
        return this.authService.allUsers()
    }

    @Get('me')
    findOne(@GetUser() user: any) {
        return this.authService.findOne(user.id)
    }

    @Post('signin')
    @Public()
    signin(@Body() data: Partial<UserRegisterDto>) {
        if (!data.username || !data.password) throw new BadRequestException('All fields are required')
        return this.authService.signin(data.username, data.password)
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @Public()
    signup(@Body(new ValidationPipe()) dto: UserRegisterDto) {
        console.log('dto: ', dto)
        return this.authService.signup(dto)
    }

    @Put('update')
    updateAccount(@GetUser() user: any, @Body(new ValidationPipe()) dto: UserUpdateDto) {
        const id = user.id
        return this.authService.updateAccount(id, dto)
    }

    @Delete('delete')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAccount(@GetUser() user: any) {
        return this.authService.deleteAccount(user.id)
    }
}
