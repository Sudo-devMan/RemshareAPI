import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtField1780754312505 implements MigrationInterface {
    name = 'AddCreatedAtField1780754312505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sharing" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sharing" DROP COLUMN "createdAt"`);
    }

}
