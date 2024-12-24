import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ExerciseCategory } from './exerciseCategory.entity';
import { User } from './user.entity';
import { WorkoutExercise } from './workoutExercise.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column()
  name: string;

  @ManyToOne(() => ExerciseCategory, (category) => category.id)
  category: ExerciseCategory;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  isPrivate: boolean;

  @ManyToOne(() => User, (user) => user.id)
  creator: User;

  @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.exercise)
  workoutExercises: WorkoutExercise[];
}
