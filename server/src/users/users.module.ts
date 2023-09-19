import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/characters/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
})

export class UsersModule {}
