// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Channel } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class GroupMembers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Channel, (group) => group.groupeMembers)
  channel: Channel;

  @Column({ default: false })
  isOwner: boolean;

  @ManyToOne(() => User, (user) => user.groupeMembers)
  user: User;
}
