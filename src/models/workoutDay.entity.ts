import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';
import { WorkoutExercise } from './workoutExercise.entity';

@Entity()
export class WorkoutDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.workoutDay)
  workoutExercises: WorkoutExercise[];
}
