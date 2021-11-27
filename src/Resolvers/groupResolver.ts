import Group from "../Models/Group";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User from "../Models/User";
import { AddMemberDataInput } from "../Helpers/input";

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

  @Mutation(() => Boolean)
  async addMember(
    @Arg("addMemberData") { names, groupId }: AddMemberDataInput
  ) {
    let group = await Group.findOne({ id: groupId });

    names.forEach(async (name) => {
      let user = await User.findOne({ name: name });

      console.log(user, group);

      group?.users.push(user!);
      group?.save();
    });

    return !!group;
  }
}

export default groupResolver;
