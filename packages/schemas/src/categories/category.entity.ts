import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Base } from '../common/base.entity.js';
import { User } from '../users/user.entity.js';
import { CategoryType } from './category-type.js';

@Entity()
@Unique("User can't have categories with the same name and type", ['name', 'type', 'userId'])
export class Category extends Base {
  @Column()
  name: string;

  @Column()
  type: CategoryType;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;
}
