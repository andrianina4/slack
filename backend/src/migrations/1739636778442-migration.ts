import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739636778442 implements MigrationInterface {
    name = 'Migration1739636778442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_c13ca26406d3e9be800054b9a4\` ON \`group\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`codeName\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`isPublic\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`isPublic\` tinyint NOT NULL DEFAULT 1
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`codeName\` varchar(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD UNIQUE INDEX \`IDX_c13ca26406d3e9be800054b9a4\` (\`codeName\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`lastname\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`firstname\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`name\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`name\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`name\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`name\` varchar(80) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`name\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`name\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`name\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`name\` varchar(80) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`firstname\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`lastname\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP INDEX \`IDX_c13ca26406d3e9be800054b9a4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`codeName\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`isPublic\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`isPublic\` tinyint NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`codeName\` varchar(100) NOT NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`IDX_c13ca26406d3e9be800054b9a4\` ON \`group\` (\`codeName\`)
        `);
    }

}
