import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupMembers } from "./group-members.entity";
import { UserWithPermissions } from "@foal/typeorm";

@Entity()
export class User extends UserWithPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @OneToMany(() => GroupMembers, (group) => group.user)
  groupeMembers: GroupMembers[];
}

export { DatabaseSession, Permission, Group } from "@foal/typeorm";
