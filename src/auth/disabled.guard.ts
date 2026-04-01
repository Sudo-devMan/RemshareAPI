import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class IsActiveGuard implements CanActivate {
    constructor(private jwt: JwtService, @InjectRepository(User) private users: Repository<User>) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp()
        const req: Request = ctx.getRequest()
        
        const token = req.headers.authorization?.split(' ')[1]


        if (!token) {
            return true
        }

        const payload = await this.jwt.verifyAsync(token)
        const user = await this.users.findOne({where: {id: payload.id}})

        const isActive = user?.isActive

        if (!isActive) {
            throw new ForbiddenException('User account has been deleted')
        }

        return true
    }
}
