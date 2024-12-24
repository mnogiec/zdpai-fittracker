import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';
import { WorkoutExercise } from './workoutExercise.entity';

@Entity()
export class WorkoutDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.workoutDay)
  workoutExercises: WorkoutExercise[];
}
