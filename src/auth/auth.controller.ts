import { Controller, Body, Post, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgetPasswordDto, ResetPasswordDto } from './dto/forgetPassword.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    // private userService: UserService,
  ) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(signupDto);
  }

  @Get('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('forgetPassword')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto, @Req() req: Request) {
    return this.authService.forgetPassword(forgetPasswordDto.email, req);
  }

  @Post('resetPassword')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
