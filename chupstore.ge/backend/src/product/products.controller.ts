import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    const products = await this.productsService.findAll();
    return products.map((p) => ({
      ...p,
      images: p.images
        ? p.images.map((img) =>
            img.startsWith('http') ? img : `http://localhost:3001${img}`,
          )
        : [],
    }));
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findOne(+id);
    return {
      ...product,
      images: product.images
        ? product.images.map((img) =>
            img.startsWith('http') ? img : `http://localhost:3001${img}`,
          )
        : [],
    };
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 8, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() product: any,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<Product> {
    // დარწმუნდი, რომ sizes ყოველთვის array იქნება
    if (product.sizes && !Array.isArray(product.sizes)) {
      product.sizes = [product.sizes];
    }

    if (images && images.length > 0) {
      product.images = images.map((file) => `/uploads/${file.filename}`);
    }

    // მთავარი სურათის ინდექსი
    const mainIndex = parseInt(product.mainImageIndex, 10);
    if (!isNaN(mainIndex) && product.images?.[mainIndex]) {
      product.mainImage = product.images[mainIndex];
    }

    return this.productsService.create(product);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    if (product.sizes && !Array.isArray(product.sizes)) {
      product.sizes = [product.sizes];
    }
    return this.productsService.update(+id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.productsService.remove(+id);
    return { message: `Product ${id} and its images deleted successfully` };
  }
}
