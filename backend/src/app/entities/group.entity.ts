// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupMembers } from "./group-members.entity";

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isPublic: boolean;

  @OneToMany(() => GroupMembers, (Channel) => Channel.channel)
  groupeMembers: GroupMembers[];
}
