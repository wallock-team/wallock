import { Column, Entity, Unique } from 'typeorm';

import { Base } from '../common/base.entity.js';

@Entity()
export class OpenId {
  @Column()
  iss: string;

  @Column()
  sub: string;
}

@Entity()
@Unique('Unique Open ID', ['openId.iss', 'openId.sub'])
export class User extends Base {
  @Column(() => OpenId)
  openId: OpenId;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;
}
