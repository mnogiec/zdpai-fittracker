import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Exercise } from './exercise.entity';

@Entity()
export class ExerciseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Exercise, (exercise) => exercise.category)
  exercises: Exercise[];
}
