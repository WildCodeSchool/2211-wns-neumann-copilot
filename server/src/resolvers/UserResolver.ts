import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, { UserInput } from "../entity/User";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    return await datasource.getRepository(User).save(data);
  }

  @Query(() => String)
  async profile(): Promise<string> {
    return "ok";
  }
}
