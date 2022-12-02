import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Meta } from './meta.entity.js';

@Entity()
export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => Meta)
  meta: Meta;
}
