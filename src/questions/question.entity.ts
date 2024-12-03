import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ nullable: true })
  parent_id: number | null;


  @Column({ nullable: true })
  parent_answer_condition: boolean | null;

  @Column()
  true_rate: number;

  @Column()
  false_rate: number;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => User, (user) => user.questions,{nullable: true})
  created_by: User;

}
