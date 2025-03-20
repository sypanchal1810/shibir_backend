import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { firstName, lastName, email, password, passwordConfirm } = signupDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User already exists!!');
    }

    if (password !== passwordConfirm) {
      throw new ConflictException('Passwords are not same!!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: to generate shibirId based on mandal name and registration number
    const shibirId = `YUVA_MN_101`;

    const newUser = await this.userModel.create({
      shibirId,
      firstName,
      lastName,
      password: hashedPassword,
      email,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const token = this.jwtService.sign({ id: newUser._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    // 1) Check If email and password entered
    if (!email || !password) {
      throw new UnauthorizedException(`Please provide email and password`);
    }

    // 2) Check If user exist or password is correct
    const existingUser = await this.userModel.findOne({ email }).select('+password');
    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      throw new UnauthorizedException('Invalid email or password!!');
    }

    const token = this.jwtService.sign({ id: existingUser._id });

    return { token };
  }
}
