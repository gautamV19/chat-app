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
  async createGroup(@Arg("groupname") name: string) {
    try {
      let group = Group.create({
        name: name,
        users: [],
      });
      let user = await User.findOne({
        id: "b343503b-50ef-452a-9b90-edf8fe566ea5",
      });
      group.users.push(user!);
      await group.save();
      return !!group;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  @Mutation(() => Boolean)
  async addMember(
    @Arg("addMemberData") { names, groupId }: AddMemberDataInput
  ) {
    try {
      let group = await Group.findOne( groupId, {relations: ["users"]} );

      names.forEach(async (name) => {
        let user = await User.findOne({ name: name });

        // console.log(user, group, group?.users);

        group?.users.push(user!);
      });
      await group?.save();

      return !!group;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  @Query(() => [Group])
  async getAllGroups() {
    try {
      let groups = await Group.find({});
      return groups;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  @Query(() => Group)
  async groupDetails(@Arg("groupId") groupId: string) {
    try {
      let group = await Group.findOne({ id: groupId });
      console.log(group, group?.users);
      return group;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}

export default groupResolver;
