import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const existing = await this.productRepository.findOne({ where: { id } });
    if (!existing) throw new NotFoundException(`Product with ID ${id} not found`);

    await this.productRepository.update(id, product);
    return this.productRepository.findOne({ where: { id } }) as Promise<Product>;
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);

    if (product.images && product.images.length) {
      for (const img of product.images) {
        const filePath = path.join(process.cwd(), img.replace('http://localhost:3001', ''));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    await this.productRepository.delete(id);
  }
}
