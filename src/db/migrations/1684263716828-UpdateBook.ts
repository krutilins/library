import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBook1684263716828 implements MigrationInterface {
    name = 'UpdateBook1684263716828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`age\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`age\``);
    }

}
