import {
  CreateDateColumn,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Meta {
  @CreateDateColumn()
  timeOfCreation: Date;

  @UpdateDateColumn()
  timeOfLastUpdate: Date;

  @DeleteDateColumn()
  timeOfDeletion?: Date;

  @VersionColumn()
  version: number;
}

@Entity()
export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => Meta)
  meta: Meta;
}
