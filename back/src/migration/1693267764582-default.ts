import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1693267764582 implements MigrationInterface {
    name = 'Default1693267764582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "nome" TO "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "senha" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "nome" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "name" TO "nome"`);
    }

}
