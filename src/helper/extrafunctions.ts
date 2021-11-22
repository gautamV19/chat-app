import jwt from "jsonwebtoken";
import User from "../Models/User";

export async function decodeUser({ req }: { req: any }) {
  let user;
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const dUser: any = jwt.verify(token, "jay swaminarayan");
    user = await User.findOne({ email: dUser.email });
  }
  return { user };
}
