import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {Response} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Res() response: Response, @Body() signInDto: Record<string, any>) {
    try {
     const result = await this.authService.signIn(signInDto);
     return response.status(HttpStatus.ACCEPTED).json({
      data: result
     })
    } catch (e){
      return response.status(HttpStatus.UNAUTHORIZED).json({
        error: e
      })
    }
  }

  @Post('/register')
    async register(@Res() response :Response, @Body() registerDto: CreateUserDto):Promise<any>{
       try {
               const result = await this.authService.register(registerDto);
               return response.status(HttpStatus.OK).json({
                 message: 'Successfully register user!',
                 result: result,
               });
             } catch (err) {
               return response.status(HttpStatus.BAD_REQUEST).json({
                 message: err.message,
               });
             }
           }
}
