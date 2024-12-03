import { Entity, PrimaryGeneratedColumn, Column,} from 'typeorm';

@Entity()
export class Scammer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}