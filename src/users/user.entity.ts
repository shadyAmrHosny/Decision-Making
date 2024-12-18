import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { Question } from '../questions/question.entity';
import { Project } from '../projects/project.entity';
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
  questions: Question[];

  @OneToMany(()=> Project, (project)=> project.created_by)
  projects: Project[];
}
