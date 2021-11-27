import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import Group from "./Group";
import Message from "./Message";

@Entity("User")
@ObjectType("User")
class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable()
  groups: Group[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}

export default User;
