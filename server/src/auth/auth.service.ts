import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(signInDto) {

    const user = await this.usersService.findOne(signInDto.username);
    const validatePassword = await bcrypt.compare(signInDto.password,user.password)

    if(!validatePassword){
          throw new UnauthorizedException('Invalid password')
    }

    const payload = { sub: user.id, username: user.username };
    return {
      id: user.id,
      username: user.username,
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret
      })
    };
  }

   async register (createDto: CreateUserDto): Promise<any>{
    const createUser = new User();
    createUser.name = createDto.name;
    createUser.email = createDto.email;
    createUser.username = createDto.username;
    createUser.password = await bcrypt.hash(createDto.password, 10);

    const user = await this.usersService.create(createUser);
    return {
      token: this.jwtService.sign({ username: user.username }),
    };
  }
}
