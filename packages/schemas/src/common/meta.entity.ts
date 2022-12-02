import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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
