import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text', { array: true, default: '{}' })
  images: string[];

  @Column({ nullable: true })
  mainImage: string; // ⭐ მთავარი ფოტო

  @Column({ nullable: true })
  category: string;

  @Column('text', { array: true, default: '{}' })
  sizes: string[];

  @CreateDateColumn()
  createdAt: Date; // 🆕 ავტომატურად შეინახავს შექმნის თარიღს
}
