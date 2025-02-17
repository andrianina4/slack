import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739612064081 implements MigrationInterface {
    name = 'Migration1739612064081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`group\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`isPublic\` tinyint NOT NULL DEFAULT 1,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`permission\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`codeName\` varchar(100) NOT NULL,
                UNIQUE INDEX \`IDX_390215abbc2901e2e623a69a03\` (\`codeName\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`sessions\` (
                \`id\` varchar(44) NOT NULL,
                \`user_id\` int NULL,
                \`content\` text NOT NULL,
                \`flash\` text NOT NULL,
                \`updated_at\` int NOT NULL,
                \`created_at\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`group_members\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`isOwner\` tinyint NOT NULL DEFAULT 0,
                \`groupId\` int NULL,
                \`userId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`messages\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`content\` varchar(255) NOT NULL,
                \`timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`senderId\` int NULL,
                \`recipentUserId\` int NULL,
                \`recipentGroupId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`group_permissions_permission\` (
                \`groupId\` int NOT NULL,
                \`permissionId\` int NOT NULL,
                INDEX \`IDX_24022d7e409de3835f25603d35\` (\`groupId\`),
                INDEX \`IDX_0777702b851f7662e2678b4568\` (\`permissionId\`),
                PRIMARY KEY (\`groupId\`, \`permissionId\`)
            ) ENGINE = InnoDB
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
            ADD \`name\` varchar(80) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_members\`
            ADD CONSTRAINT \`FK_1aa8d31831c3126947e7a713c2b\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_members\`
            ADD CONSTRAINT \`FK_fdef099303bcf0ffd9a4a7b18f5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\`
            ADD CONSTRAINT \`FK_2db9cf2b3ca111742793f6c37ce\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\`
            ADD CONSTRAINT \`FK_ef2716011623b3d7ad3afe758d6\` FOREIGN KEY (\`recipentUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\`
            ADD CONSTRAINT \`FK_ff45c627a45cd58e9356ff2e4a7\` FOREIGN KEY (\`recipentGroupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_permissions_permission\`
            ADD CONSTRAINT \`FK_24022d7e409de3835f25603d35d\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_permissions_permission\`
            ADD CONSTRAINT \`FK_0777702b851f7662e2678b45689\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`group_permissions_permission\` DROP FOREIGN KEY \`FK_0777702b851f7662e2678b45689\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_permissions_permission\` DROP FOREIGN KEY \`FK_24022d7e409de3835f25603d35d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_ff45c627a45cd58e9356ff2e4a7\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_ef2716011623b3d7ad3afe758d6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_fdef099303bcf0ffd9a4a7b18f5\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_1aa8d31831c3126947e7a713c2b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`name\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`name\` varchar(255) NOT NULL
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
            ADD \`isPublic\` tinyint NOT NULL DEFAULT 1
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_0777702b851f7662e2678b4568\` ON \`group_permissions_permission\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_24022d7e409de3835f25603d35\` ON \`group_permissions_permission\`
        `);
        await queryRunner.query(`
            DROP TABLE \`group_permissions_permission\`
        `);
        await queryRunner.query(`
            DROP TABLE \`messages\`
        `);
        await queryRunner.query(`
            DROP TABLE \`group_members\`
        `);
        await queryRunner.query(`
            DROP TABLE \`sessions\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_390215abbc2901e2e623a69a03\` ON \`permission\`
        `);
        await queryRunner.query(`
            DROP TABLE \`permission\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`group\`
        `);
    }

}
