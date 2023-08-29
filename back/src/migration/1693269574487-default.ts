import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1693269574487 implements MigrationInterface {
    name = 'Default1693269574487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" RENAME COLUMN "município" TO "municipio"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" RENAME COLUMN "municipio" TO "município"`);
    }

}
