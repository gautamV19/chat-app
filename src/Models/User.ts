import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  OneToMany,
} from "typeorm";
import Group from "./group";
import Message from "./message";

@Entity("User")
@ObjectType("User")
class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;
  // todo how to use cuid here

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Group, (group) => group.users)
  @JoinColumn()
  @Field()
  groups: Group[];

  @OneToMany(() => Message, (message) => message.user)
  @Field()
  messages: Message[];
}

export default User;
