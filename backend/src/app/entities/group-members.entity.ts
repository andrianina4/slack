// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class GroupMembers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, (group) => group.groupeMembers)
  group: Group;

  @Column({ default: false })
  isOwner: boolean;

  @ManyToOne(() => User, (user) => user.groupeMembers)
  user: User;
}
