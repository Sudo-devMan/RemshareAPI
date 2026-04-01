import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constants';
import { UsersModule } from 'src/users/users.module';
import { IsActiveGuard } from './disabled.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }, {
    provide: APP_GUARD,
    useClass: IsActiveGuard
  }],
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '2h' }
    })
  ],
  exports: [JwtModule]
})
export class AuthModule {}
