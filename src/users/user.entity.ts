import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { Question } from '../questions/question.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_admin: boolean;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Question, (question) => question.created_by)
  questions: Question[];  // Array of questions created by the user
}
