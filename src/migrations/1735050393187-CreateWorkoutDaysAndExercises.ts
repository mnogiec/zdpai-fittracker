import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkoutDaysAndExercises1735050393187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workout_day" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_1c2ac7fddbf8f346f5c1c2229ec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workout_exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sets" integer NOT NULL, "reps" integer NOT NULL, "weight" integer NOT NULL, "exerciseId" uuid, "workoutDayId" uuid, CONSTRAINT "PK_9598996a913c5f5114f9e6403b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_day" ADD CONSTRAINT "FK_ae560401df37ecbef136d5e1e93" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_0e37ef5b503b55b34643ef507e9" FOREIGN KEY ("workoutDayId") REFERENCES "workout_day"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_0e37ef5b503b55b34643ef507e9"`);
    await queryRunner.query(`ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611"`);
    await queryRunner.query(`ALTER TABLE "workout_day" DROP CONSTRAINT "FK_ae560401df37ecbef136d5e1e93"`);
    await queryRunner.query(`DROP TABLE "workout_exercise"`);
    await queryRunner.query(`DROP TABLE "workout_day"`);
  }
}
