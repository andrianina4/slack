import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupMembers } from "./group-members.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => GroupMembers, (group) => group.user)
  groupeMembers: GroupMembers[];
}

export { DatabaseSession, Permission, Group } from "@foal/typeorm";
