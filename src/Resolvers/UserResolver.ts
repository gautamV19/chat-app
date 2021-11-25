import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
  UseMiddleware,
  Authorized,
  Ctx,
} from "type-graphql";
import User from "../Models/User";
import { CreateUserInput } from "../helper/input";
import jwt from "jsonwebtoken";
import MyContext from "../helper/context";
import bcrypt from "bcryptjs";

@ObjectType()
class LoginOutput {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}

@Resolver(() => String)
class UserResolver {
  @Query(() => String)
  greet() {
    return "Jay Swaminarayan";
  }

  @Mutation(() => Boolean)
  @UseMiddleware()
  async createUser(@Arg("data") createUserInput: CreateUserInput) {
    const user = User.create({
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
    });
    user.save();

    return !!user;
  }

  @Mutation(() => LoginOutput)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    const user: any = await User.findOne({ email: email });
    // why I can't check if user exist or not

    const isMatched = await bcrypt.compare(password, user.password);
    let token = "";
    if (isMatched) {
      token = jwt.sign({ email }, "jay swaminarayan");
    }
    return { user, token };
  }

  @Query(() => [User])
  @Authorized()
  getUser() {
    const users = User.find();
    return users;
  }

  // //** Not needed for now */
  // @Query(() => Task)
  // getTask() {
  //   const task = new Task();
  //   task.title = "jsn";
  //   task.description = "hihi";
  //   task.time = "7.13pm";

  //   return task;
  // }

  @Query(() => User)
  @Authorized()
  me(@Ctx() { user }: MyContext) {
    return user;
  }
}

export default UserResolver;
