import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739652914870 implements MigrationInterface {
    name = 'Migration1739652914870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_1aa8d31831c3126947e7a713c2b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_ff45c627a45cd58e9356ff2e4a7\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_members\` CHANGE \`groupId\` \`channelId\` int NULL
        `);
        await queryRunner.query(`
            CREATE TABLE \`channel\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`isPublic\` tinyint NOT NULL DEFAULT 1,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\` DROP COLUMN \`isPublic\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_members\`
            ADD CONSTRAINT \`FK_382b31f7eba43b7b5f3a1f13079\` FOREIGN KEY (\`channelId\`) REFERENCES \`channel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\`
            ADD CONSTRAINT \`FK_ff45c627a45cd58e9356ff2e4a7\` FOREIGN KEY (\`recipentGroupId\`) REFERENCES \`channel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_ff45c627a45cd58e9356ff2e4a7\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_382b31f7eba43b7b5f3a1f13079\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD \`isPublic\` tinyint NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            DROP TABLE \`channel\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_members\` CHANGE \`channelId\` \`groupId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`messages\`
            ADD CONSTRAINT \`FK_ff45c627a45cd58e9356ff2e4a7\` FOREIGN KEY (\`recipentGroupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`group_members\`
            ADD CONSTRAINT \`FK_1aa8d31831c3126947e7a713c2b\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
