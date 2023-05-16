import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBook1684263790413 implements MigrationInterface {
    name = 'UpdateBook1684263790413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`age\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`age\` int NOT NULL`);
    }

}
