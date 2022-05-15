import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cpf_restricted_list' })
export class CpfRestrictedList {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    name: 'cpf',
    nullable: false,
    unique: true,
  })
  public cpf: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;

  public constructor(attrs: Partial<CpfRestrictedList> = {}) {
    Object.assign(this, attrs);
  }
}
