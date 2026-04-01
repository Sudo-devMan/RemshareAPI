import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule] // This allows the user repository to be used in modules that import this module
})
export class UsersModule {}
