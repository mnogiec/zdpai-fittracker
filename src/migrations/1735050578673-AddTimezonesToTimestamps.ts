import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimezonesToTimestamps1735050578673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workout_day" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "workout_day" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "workout_day" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "workout_day" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "workout_day" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "workout_day" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "exercise" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "exercise" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "exercise" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "exercise" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "workout_day" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "workout_day" ADD "date" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "workout_day" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "workout_day" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "workout_day" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "workout_day" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
  }
}
