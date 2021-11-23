import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import { createConnection } from "typeorm";

import UserResolver from "./Resolvers/User";
import { decodeUser } from "./helper/extrafunctions";
import authChecker from "./helper/authChecker";
import User from "./Models/User";

dotenv.config({ path: "./config.env" });

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: authChecker,
  });
  const server = new ApolloServer({
    schema,
    context: decodeUser,
  });

  server
    .listen(7500)
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    })
    .catch((e) => {
      console.log(`error in running the server ${e}`);
    });
};

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User],
})
  .then(() => {
    console.log("Database Connected");
    main();
  })
  .catch((e) => {
    console.log(`error in connecting the db ${e}`);
  });
