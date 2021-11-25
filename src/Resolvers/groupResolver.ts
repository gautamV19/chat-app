import Group from "../Models/Group";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
class groupResolver {
  @Query(() => String)
  groupGreet() {
    return "Jay Swaminarayan";
  }

  @Mutation(() => Boolean)
  createGroup(@Arg("groupname") name: string) {
    let group = Group.create({
      name: name,
    });
    group.save();

    return !!group;
  }
}

export default groupResolver;
