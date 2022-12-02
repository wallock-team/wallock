import { Entity, Column } from 'typeorm';

@Entity()
export class OpenId {
  @Column()
  iss: string;

  @Column()
  sub: string;
}
