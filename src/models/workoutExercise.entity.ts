import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Exercise } from './exercise.entity';
import { WorkoutDay } from './workoutDay.entity';

@Entity()
export class WorkoutExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column()
  weight: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises)
  exercise: Exercise;

  @ManyToOne(() => WorkoutDay, (workoutDay) => workoutDay.workoutExercises)
  workoutDay: WorkoutDay;
}
