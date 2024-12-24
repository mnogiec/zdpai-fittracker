import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExercise1735047232976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "videoUrl" character varying, "imageUrl" character varying, "isPrivate" boolean NOT NULL, "categoryId" integer, "creatorId" uuid, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise" ADD CONSTRAINT "FK_d61e87cf918b359c439f071634b" FOREIGN KEY ("categoryId") REFERENCES "exercise_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise" ADD CONSTRAINT "FK_25cecff361c08584f2a91261664" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_25cecff361c08584f2a91261664"`);
    await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_d61e87cf918b359c439f071634b"`);
    await queryRunner.query(`DROP TABLE "exercise"`);
  }
}
