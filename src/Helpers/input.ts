import { Field, InputType } from "type-graphql";

@InputType("addMemberDataInput")
export class AddMemberDataInput {
  @Field(() => [String])
  names: string[];
  @Field()
  groupId: string;
}
