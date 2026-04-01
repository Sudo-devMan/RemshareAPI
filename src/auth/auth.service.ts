import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserBaseDto } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto, UserUpdateDto } from 'src/users/user-register.dto';
import { SALT } from 'src/constants';

@Injectable()
export class AuthService {
    // signup*, signin*, update account*, delete account*, get account*
    constructor(@InjectRepository(User) private users: Repository<User>, private jwtService: JwtService) {}

    async signin(username: string, password: string) {
        const user = await this.users.findOne({ where: {username} })
        
        if (!user)
            throw new NotFoundException('Username does not exist.')
        if (!user.isActive)
            throw new ForbiddenException('User account has been deleted')
        
        const match = await bcrypt.compare(password, user.password)

        if (!match)
            throw new UnauthorizedException('Incorrect password')

        const payload = { id: user.id, username: user.username, profilePic: user.profilePictureUrl, isActive: user.isActive }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async signup(dto: UserRegisterDto): Promise<User> {
        const {username, email, password} = dto
        const existing = await this.users.findOne({where: {username}})
        if (existing) 
            throw new BadRequestException('Username has already been taken')
        const exEmail = await this.users.findOne({where: {email: email}})
        if (exEmail)
            throw new BadRequestException('Email has already been taken')

        // throw new BadRequestException('password has already been taken. freddy11@gmail.com uses that password')
        
        try{
            const passwordHash = await bcrypt.hash(password, SALT)
            const newUser = {
                password: passwordHash,
                username: dto.username,
                email: dto.email
            }

            console.log('newUser:', newUser)

            const user = this.users.create(newUser)
            return this.users.save(user)
        } catch (err) {
            throw new Error(err)
        }
    }

    async updateAccount(id: number, dto: UserUpdateDto) {
        const user = await this.users.findOne({where: {id}})
        if (!user)
            throw new NotFoundException('User does not exist')
        if (dto.password) {
            const newPassword = await bcrypt.hash(dto.password, SALT)
            dto.password = newPassword
        }

        this.users.merge(user, dto)
        const newUser = await this.users.save(user)
        const newToken = await this.jwtService.signAsync({...newUser})

        return {
            "new_token": newToken,
            "new_user": newUser
        }
    }

    async deleteAccount(id: number): Promise<void> {
        // i basically just deactivate the accounts and restrict API access
        const user = await this.users.findOne({where: {id}})
        if (!user)
            throw new NotFoundException('User does not exist.')
        if (!user.isActive)
            throw new ForbiddenException('User has already been deleted')
        user.isActive = false;
        await this.users.save(user)
    }

    async findOne(id: number): Promise<User| null> {
        const user = await this.users.findOne({ where: {id} })
        return user
    }

    async allUsers(): Promise<User[]> {
        const users = await this.users.find()
        return users
    }
}
