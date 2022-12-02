import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from '../categories/category.entity.js';
import { Base } from '../common/base.entity.js';
import { Wallet } from '../wallets/wallet.entity.js';

@Entity()
export class Transaction extends Base {
  @Column()
  amount: number;

  @Column({ nullable: true })
  note?: string;

  @Column()
  time: Date;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => Wallet)
  wallet: Wallet;
}
