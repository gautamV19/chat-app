import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Message from "./Message";
import User from "./User";

// group name, auto generated id, list of Group in group(use typeorm relations), list of message for this group(use typeorm relations)

@Entity("Group")
@ObjectType("Group")
class Group extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => User, (user) => user.groups)
  @Field(() => [User])
  users: User[];

  @OneToMany(() => Message, (message) => message.group)
  messages: Message[];

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;
}

export default Group;
