import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Exercise } from './exercise.entity';
import { WorkoutDay } from './workoutDay.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ unique: true, select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Exercise, (exercise) => exercise.creator)
  exercises: Exercise[];

  @OneToMany(() => WorkoutDay, (workoutDay) => workoutDay.user)
  workoutDays: WorkoutDay[];
}
