import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1693267485889 implements MigrationInterface {
    name = 'Default1693267485889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "dt_update" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dt_update" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dt_update" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dt_update" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dt_update" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "dt_update" SET NOT NULL`);
    }

}
