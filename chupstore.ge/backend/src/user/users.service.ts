import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: { username: string; email: string; password: string; role?: 'user' | 'admin' }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = this.repo.create({ ...data, password: hashed, role: data.role || 'user' });
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }

  generateToken(user: User) {
    return jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'MY_SECRET_KEY',
      { expiresIn: '1d' }
    );
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'MY_SECRET_KEY') as any;
    } catch {
      return null;
    }
  }

  async updateProfile(id: number, data: Partial<User>) {
    const user = await this.findById(id);
    if (!user) return null;
    Object.assign(user, data);
    return this.repo.save(user);
  }
}
