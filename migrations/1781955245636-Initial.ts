import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1781955245636 implements MigrationInterface {
    name = 'Initial1781955245636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "profilePictureUrl" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sharing" ("id" SERIAL NOT NULL, "note" text, "receiverEmail" character varying NOT NULL, "senderEmail" character varying DEFAULT 'anonymous@no-email.remshare', "password" character varying NOT NULL, "files" text NOT NULL, "uniqueId" character varying NOT NULL, "receiveUrl" character varying DEFAULT 'NO LINK', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f8c5f77f3801cd2e106cbaed480" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "share_file" ("id" SERIAL NOT NULL, "url" character varying, "name" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_872cafc7a1567f241d865c9295c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "share_file"`);
        await queryRunner.query(`DROP TABLE "sharing"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
