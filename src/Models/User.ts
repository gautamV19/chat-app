import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinColumn,
  OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";
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

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @ManyToMany(() => Group, (group) => group.users)
  @JoinColumn()
  @Field()
  groups: Group[];

  @OneToMany(() => Message, (message) => message.user)
  @Field()
  messages: Message[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}

export default User;
