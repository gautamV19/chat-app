import { AuthChecker } from "type-graphql";
import MyContext from "./context";

const authChecker: AuthChecker<MyContext> = async ({ context: { user } }) => {
  return user ? true : false;
};

export default authChecker;
