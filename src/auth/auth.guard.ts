import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PUBLIC_DECORATOR } from "./public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean>{
    
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_DECORATOR, [
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) {
            return true
        }

        const req = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeaders(req)

        if (!token) {
            throw new UnauthorizedException('There is no access token found in headers')
        }

        try {
            const payload = await this.jwtService.verifyAsync(token)
            req['user'] = payload
        } catch (err) {
            throw new UnauthorizedException('Token invalid or expired')
        }

        return true
    }

    extractTokenFromHeaders(req: Request) {
        const [type, token] = req.headers.authorization?.split(' ') ?? []
        return type === 'Broski' ? token : null
    }
}
