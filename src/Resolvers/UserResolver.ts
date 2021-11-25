import User from "src/Models/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
class UserResolver {
  @Query(() => String)
  greet() {
    return "Jay Swaminarayan";
  }

  @Mutation(() => Boolean)
  createUser(@Arg("username") name: string) {
    const user = User.create({ name });
    user.save();
    return !!user;
  }
}

export default UserResolver;
