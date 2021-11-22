import { Field, InputType } from "type-graphql";

@InputType("createUserInput")
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType("taskInput")
export class TaskInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;
}
