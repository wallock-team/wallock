import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Base } from '../common/base.entity.js';
import { User } from '../users/user.entity.js';

@Entity()
@Unique('A user cannot have wallets with the same names', ['name', 'userId'])
export class Wallet extends Base {
  @Column()
  name: string;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;
}
