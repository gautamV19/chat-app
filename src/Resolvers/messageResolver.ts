import Group from "../Models/Group";
import Message from "../Models/Message";
import User from "../Models/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
class messageResolver {
  @Query(() => String)
  greetMessage() {
    return "Jay Swaminarayan from messages";
  }

  @Mutation(() => Boolean)
  async addMessage(
    @Arg("message") content: string,
    @Arg("groupId") groupId: string,
    @Arg("userId") userId: string
  ) {
    try {
      let group = await Group.findOne({ id: groupId });
      let user = await User.findOne({ id: userId });
      let message = Message.create({
        message: content,
        group: group,
        user: user,
      });
      await message.save();
      return !!message;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  @Query(() => [Message])
  async listOfMessages() {
    //ToDo: douubt
  }
}

export default messageResolver;
