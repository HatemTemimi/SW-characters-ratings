import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}

   async create(data:CreateUserDto): Promise<Users>{
          const existing = await this.prisma.users.findUnique({
               where: {
                 username: data.username,
               },
          });
         
          if (existing) {
            throw new ConflictException('username already exists');
          }

          return this.prisma.users.create({
            data,
          });
  }

  findOne(username: string) {
    return this.prisma.users.findUnique(
      {
        where: 
        {
          username: username, 
        }
      })
  }

}
