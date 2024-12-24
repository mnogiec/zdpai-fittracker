import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExerciseCategories1735032373707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exercise_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_977a54be5b15644bf5dc22093d5" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(`INSERT INTO "exercise_category" ("name") VALUES ('Legs')`);
    await queryRunner.query(`INSERT INTO "exercise_category" ("name") VALUES ('Triceps')`);
    await queryRunner.query(`INSERT INTO "exercise_category" ("name") VALUES ('Biceps')`);
    await queryRunner.query(`INSERT INTO "exercise_category" ("name") VALUES ('Back')`);
    await queryRunner.query(`INSERT INTO "exercise_category" ("name") VALUES ('Chest')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "exercise_category"`);
  }
}
