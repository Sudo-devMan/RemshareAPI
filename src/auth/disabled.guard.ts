import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class IsActiveGuard implements CanActivate {
    constructor(private jwt: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp()
        const req: Request = ctx.getRequest()
        
        const token = req.headers.authorization?.split(' ')[1]

        console.log("Token:", token)

        if (!token) {
            console.log("There is no token")
            return true
        }

        const user = await this.jwt.verifyAsync(token)
        console.log("User: ", user)
        const isActive = user.isActive

        console.log("isActive: ", isActive)

        if (!isActive) {
            console.log("User is not active")
            throw new ForbiddenException('User account has been deleted')
        }

        console.log('Final return')
        return true
    }
}
