import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('decision')
export class Decision{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  decision_name: string;

  @Column()
  decision_rate: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

}