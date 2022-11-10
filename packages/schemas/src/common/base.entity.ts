import {
  CreateDateColumn,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm'

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column(() => Meta)
  meta: Meta
}

class Meta {
  @CreateDateColumn()
  timeOfCreation: Date

  @UpdateDateColumn()
  timeOfLastUpdate: Date

  @DeleteDateColumn()
  timeOfDeletion?: Date

  @VersionColumn()
  version: number
}
