import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1684259804807 implements MigrationInterface {
  name = 'Init1684259804807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`hello\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`books_authors\` (\`bookId\` int NOT NULL, \`authorId\` int NOT NULL, INDEX \`IDX_49317e96c1e48ad58971b515b5\` (\`bookId\`), INDEX \`IDX_bd1523e8f4d8a04cd9e6bd8a13\` (\`authorId\`), PRIMARY KEY (\`bookId\`, \`authorId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`books_authors\` ADD CONSTRAINT \`FK_49317e96c1e48ad58971b515b50\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`books_authors\` ADD CONSTRAINT \`FK_bd1523e8f4d8a04cd9e6bd8a139\` FOREIGN KEY (\`authorId\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`books_authors\` DROP FOREIGN KEY \`FK_bd1523e8f4d8a04cd9e6bd8a139\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`books_authors\` DROP FOREIGN KEY \`FK_49317e96c1e48ad58971b515b50\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bd1523e8f4d8a04cd9e6bd8a13\` ON \`books_authors\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_49317e96c1e48ad58971b515b5\` ON \`books_authors\``,
    );
    await queryRunner.query(`DROP TABLE \`books_authors\``);
    await queryRunner.query(`DROP TABLE \`book\``);
    await queryRunner.query(`DROP TABLE \`author\``);
  }
}
