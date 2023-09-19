import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingsService {
 constructor(private prisma: PrismaService){}

 async create(data: CreateRatingDto) {
    const exists = await this.prisma.rating.findUnique({
      where:{
        userID_characterName: {
          userID: data.userID,
          characterName: data.characterName
        }
      },
    })
    if (exists){
      return this.update(data)
    }
    const rating = await this.prisma.rating.create({data})
    return rating
  }

  findAllByUserID(id: number) {
    return this.prisma.rating.findMany({
      where:{
        userID: Number(id)
      }
    })
  }

  findOne(id: number, characterName: string) {
    return this.prisma.rating.findFirst({
      where: {
        userID: id, characterName
      }
    })
  }

  update(data: UpdateRatingDto) {
    if (data.value == null ) return this.prisma.rating.delete({
      where:{
        userID_characterName: {
          userID: data.userID,
          characterName: data.characterName
        }
      },
    })
    return this.prisma.rating.update({
      where:{
        userID_characterName: {
          userID: data.userID,
          characterName: data.characterName
        }
      },
      data:{
        value: data.value
      }
    })
  }

  deleteByUserID(id: number){
    return this.prisma.rating.deleteMany({
      where:{
        userID: Number(id)
      }
    })
  }

}
