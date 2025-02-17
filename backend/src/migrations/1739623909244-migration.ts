import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739623909244 implements MigrationInterface {
    name = 'Migration1739623909244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_c13ca26406d3e9be800054b9a4\` ON \`group\`
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_groups_group\` (
                \`userId\` int NOT NULL,
                \`groupId\` int NOT NULL,
                INDEX \`IDX_84ff6a520aee2bf2512c01cf46\` (\`userId\`),
                INDEX \`IDX_8abdfe8f9d78a4f5e821dbf620\` (\`groupId\`),
                PRIMARY KEY (\`userId\`, \`groupId\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_user_permissions_permission\` (
                \`userId\` int NOT NULL,
                \`permissionId\` int NOT NULL,
                INDEX \`IDX_4c3462965c06c5bc3c8996f452\` (\`userId\`),
                INDEX \`IDX_4a38ad03e94f4de594fc09fb53\` (\`permissionId\`),
                PRIMARY KEY (\`userId\`, \`permissionId\`)
            ) ENGINE = InnoDB
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
            ALTER TABLE \`user_groups_group\`
            ADD CONSTRAINT \`FK_84ff6a520aee2bf2512c01cf462\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_groups_group\`
            ADD CONSTRAINT \`FK_8abdfe8f9d78a4f5e821dbf6203\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_user_permissions_permission\`
            ADD CONSTRAINT \`FK_4c3462965c06c5bc3c8996f4524\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_user_permissions_permission\`
            ADD CONSTRAINT \`FK_4a38ad03e94f4de594fc09fb53c\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_user_permissions_permission\` DROP FOREIGN KEY \`FK_4a38ad03e94f4de594fc09fb53c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_user_permissions_permission\` DROP FOREIGN KEY \`FK_4c3462965c06c5bc3c8996f4524\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_groups_group\` DROP FOREIGN KEY \`FK_8abdfe8f9d78a4f5e821dbf6203\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_groups_group\` DROP FOREIGN KEY \`FK_84ff6a520aee2bf2512c01cf462\`
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
            DROP INDEX \`IDX_4a38ad03e94f4de594fc09fb53\` ON \`user_user_permissions_permission\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_4c3462965c06c5bc3c8996f452\` ON \`user_user_permissions_permission\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_user_permissions_permission\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_8abdfe8f9d78a4f5e821dbf620\` ON \`user_groups_group\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_84ff6a520aee2bf2512c01cf46\` ON \`user_groups_group\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_groups_group\`
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`IDX_c13ca26406d3e9be800054b9a4\` ON \`group\` (\`codeName\`)
        `);
    }

}
