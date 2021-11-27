import Group from "../Models/Group";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import User from "../Models/User";
import { AddMemberDataInput } from "../Helpers/input";

@Resolver()
class groupResolver {
  @Query(() => String)
  groupGreet() {
    return "Jay Swaminarayan";
  }

  @FieldResolver()
  async users(@Root() group: Group) {
    // let users = await User.find({g});
  }

  @Mutation(() => Boolean)
  async createGroup(@Arg("groupname") name: string) {
    try {
      let group = Group.create({
        name: name,
      });
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
      let group = await Group.findOne({ id: groupId });

      names.forEach(async (name) => {
        let user = await User.findOne({ name: name });

        console.log(user, group);

        group?.users.push(user!);
        await group?.save();
      });

      let group_updated = await Group.findOne({ id: groupId });

      console.log("group_updated", group_updated, group);

      return !!group_updated;
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
