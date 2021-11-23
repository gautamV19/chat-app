import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import bcrypt from "bcryptjs";

@Entity("User")
@ObjectType("User")
class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;
}

export default User;
