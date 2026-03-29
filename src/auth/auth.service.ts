import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserBaseDto } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from 'src/users/user-register.dto';
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
        const {username, email} = dto
        const existing = await this.users.findOne({where: {username}})
        if (existing) throw new BadRequestException('Username has already been taken')
        const exEmail = await this.users.findOne({where: {email}})
        if (exEmail)
            throw new BadRequestException('Email has already been taken')
        
        try{
            const password = await bcrypt.hash(dto.password, SALT)
            const newUser = {
                password,
                username: dto.username,
                email: dto.email
            }

            const user = this.users.create(newUser)
            return this.users.save(user)
        } catch (err) {
            throw new Error(err)
        }
    }

    async updateAccount(id: number, dto: Partial<UserBaseDto>) {
        const user = await this.users.findOne({where: {id}})
        if (!user)
            throw new NotFoundException('User does not exist')
        if (dto.password) {
            console.log("There is password: ", dto)
            const match = await bcrypt.compare(dto.password, user.password)
            if (match) {
                console.log("Pass match!")
                const newPassword = await bcrypt.hash(dto.password, SALT)
                dto.password = newPassword
            }else {
                dto.password = undefined
            }
            console.log("After clean: ", dto)
        }
        
        this.users.merge(user, dto)
        return this.users.save(user)
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
