import { Column, Entity, Unique } from 'typeorm';

import { Base } from 'common/base.entity.js';

@Entity()
@Unique('Unique Open ID', ['iss', 'sub'])
export class User extends Base {
  @Column()
  iss: string;

  @Column()
  sub: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;
}
