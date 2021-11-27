import Group from "src/Models/Group";
import Message from "src/Models/Message";
import User from "src/Models/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
class messageResolver {
  @Query()
  greetMessage() {
    return "Jay Swaminarayan from messages";
  }

  @Mutation(() => Boolean)
  async addMessage(
    @Arg("message") content: string,
    @Arg("groupId") groupId: string,
    @Arg("userId") userId: string
  ) {
    let group = await Group.findOne({ id: groupId });
    let user = await User.findOne({ id: userId });
    let message = await Message.create({ message: content });

    group?.messages.push(message);
    user?.messages.push(message);

    return !!message;
  }

  @Query(() => [Message])
  async listOfMessages() {
    //ToDo: douubt
  }
}

export default messageResolver;
