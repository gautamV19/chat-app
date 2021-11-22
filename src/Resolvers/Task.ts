import MyContext from "src/helper/context";
import Task from "../Models/Task";
import { Resolver, Query, Mutation, Authorized, Arg, Ctx } from "type-graphql";
import { TaskInput } from "../helper/input";

@Resolver(() => String)
class TaskResolver {
  @Query(() => String)
  greetTodo() {
    return "JaySwaminarayan213";
  }

  @Mutation(() => Boolean)
  @Authorized()
  async createTodo(
    @Arg("data") createTodoInput: TaskInput,
    @Ctx() { user }: MyContext
  ) {
    const today = new Date();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const todo = Task.create({
      title: createTodoInput.title,
      description: createTodoInput.description,
      time: time.toString(),
      user: user,
    });
    todo.save();
    return !!todo;
  }

  @Query(() => [Task])
  @Authorized()
  async getTodo(@Ctx() { user }: MyContext) {
    const todos = await Task.find({ user: user });
    return todos;
  }

  @Query(() => Task)
  @Authorized()
  async fetchTodo(@Arg("id") id: string) {
    const todo = await Task.findOne({ id: id });
    return todo;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async editTodo(
    @Arg("id") id: string,
    @Arg("data") createTodoInput: TaskInput
  ) {
    var todo = await Task.findOne({ id: id });
    if (todo) {
      todo.description = createTodoInput.description;
      todo.title = createTodoInput.title;
      todo.save();
    }
    return !!todo;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteTodo(@Arg("id") id: string) {
    const todo = await Task.findOne({ id: id });
    var deleted = false;
    if (todo) {
      todo.remove();
      deleted = true;
    }
    return deleted;
  }
}

export default TaskResolver;
