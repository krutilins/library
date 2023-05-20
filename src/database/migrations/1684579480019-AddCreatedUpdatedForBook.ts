import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedUpdatedForBook1684579480019 implements MigrationInterface {
    name = 'AddCreatedUpdatedForBook1684579480019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`hello\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`hello\` varchar(255) NOT NULL`);
    }

}
