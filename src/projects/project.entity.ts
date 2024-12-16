import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  client_name: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  from_language: string;

  @Column({ type: 'varchar', length: 50 })
  to_language: string;

  @ManyToOne(() => User, (user) => user.projects, { nullable: true })
  created_by: User;

  @Column({ type: 'boolean', default: false })
  scammer: boolean;

  @Column({
    type:'varchar',
    default: 'pending',
  })
  decision: string;

  @Column({ nullable: true })
  rate: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
