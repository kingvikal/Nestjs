import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
    Unique,
  } from 'typeorm';
  import { Product } from '../product/product.entity';
  import { CategoryTypes } from './category.enums';
  
  @Entity('categories')
  @Unique(['type'])
  export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @OneToMany(type => Product, product => product.category, {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    products: Product[];
  
    @Column()
    type: CategoryTypes;
  
  
  }