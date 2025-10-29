import { Controller, Post, Body, Get, Headers, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string; confirmPassword: string }) {
    if (body.password !== body.confirmPassword) return { error: 'Passwords do not match' };
    if (await this.service.findByEmail(body.email)) return { error: 'Email already exists' };
    if (await this.service.findByUsername(body.username)) return { error: 'Username already exists' };

    const user = await this.service.create({ username: body.username, email: body.email, password: body.password });
    const token = this.service.generateToken(user);
    return { token, user };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.service.validateUser(body.email, body.password);
    if (!user) return { error: 'Invalid email or password' };
    const token = this.service.generateToken(user);
    return { token, user };
  }

  @Get('profile')
  async profile(@Headers('authorization') authHeader: string) {
    if (!authHeader) return { error: 'Token missing' };
    const token = authHeader.replace('Bearer ', '');
    const decoded = this.service.verifyToken(token);
    if (!decoded) return { error: 'Invalid or expired token' };
    const user = await this.service.findById(decoded.id);
    if (!user) return { error: 'User not found' };
    return user;
  }

  @Put('profile')
  async updateProfile(@Headers('authorization') authHeader: string, @Body() body: Partial<any>) {
    if (!authHeader) return { error: 'Token missing' };
    const token = authHeader.replace('Bearer ', '');
    const decoded = this.service.verifyToken(token);
    if (!decoded) return { error: 'Invalid or expired token' };
    const updatedUser = await this.service.updateProfile(decoded.id, body);
    if (!updatedUser) return { error: 'User not found' };
    return updatedUser;
  }
}
