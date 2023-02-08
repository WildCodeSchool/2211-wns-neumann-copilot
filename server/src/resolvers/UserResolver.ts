import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, { UserInput, encodePassword } from "../entity/User";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") { email, password }: UserInput): Promise<User> {
    const hashedPassword = await encodePassword(password);
    console.log(hashedPassword);

    return await datasource.getRepository(User).save({ email, hashedPassword });
  }

  @Query(() => String)
  async profile(): Promise<string> {
    return "ok";
  }
}
