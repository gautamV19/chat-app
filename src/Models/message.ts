import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Group from "./Group";
import User from "./User";

@Entity("Message")
@ObjectType("Message")
class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;
  // todo how to use cuid here

  @Column()
  @Field()
  message: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;

  @ManyToOne(() => Group, (group) => group.messages)
  group: Group;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}

export default Message;
