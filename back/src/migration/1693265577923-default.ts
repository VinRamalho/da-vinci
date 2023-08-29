import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1693265577923 implements MigrationInterface {
    name = 'Default1693265577923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "email" text NOT NULL, "senha" text NOT NULL, "dt_creation" TIMESTAMP NOT NULL, "dt_update" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" SERIAL NOT NULL, "município" text NOT NULL, "dt_send" TIMESTAMP NOT NULL, "status" character varying(1) NOT NULL, "dt_creation" TIMESTAMP NOT NULL, "dt_update" TIMESTAMP NOT NULL, "userId" integer, "clientId" integer, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "email" text NOT NULL, "dt_creation" TIMESTAMP NOT NULL, "dt_update" TIMESTAMP NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_be846ad4b43f40acc7034ef7f40" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_67e0190e8be8e182bc48fc55ade" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_67e0190e8be8e182bc48fc55ade"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_be846ad4b43f40acc7034ef7f40"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
