import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CharactersModule } from './characters/characters.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, CharactersModule, RatingsModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
