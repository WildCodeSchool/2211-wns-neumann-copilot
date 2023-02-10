import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, { UserInput, encodePassword, verifyPassword } from "../entity/User";
import jwt from 'jsonwebtoken';
import { ApolloError } from "apollo-server-errors";
import { env } from "../env";
import { contextType } from "..";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") { email, password }: UserInput): Promise<User> {
    const hashedPassword = await encodePassword(password);
    return await datasource.getRepository(User).save({ email, hashedPassword });
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await datasource.getRepository(User).find();
  }

  @Mutation(() => String) 
  async login(@Arg("data") { email, password }: UserInput, @Ctx() { res }: contextType): Promise<string> {
    const user = await datasource.getRepository(User).findOneBy({email});

    if (user === null || !(await verifyPassword(password, user.hashedPassword))) {
      throw new ApolloError("invalid credentials", "INVALID_CREDS");    
    }

    const token = jwt.sign({userId: user.id}, env.JWT_PRIVATE_KEY);

    // reponce via cookie (nom, valeur, options) / secure empeche au navigateur d'interpreter un cookie si on est pas en https
    res.cookie('token', token, {httpOnly: true, secure: env.NODE_ENV === "production"});

    return token;
  }

  // requete authentifié a partir d'appolostudio pour recupere le token

  // la query n'est realiser que si on a les autorisation (on peu mettre des role dans les () pour donner des condition plus précise sur les autorisation)
  @Authorized()
  @Query(() => User)
  async profile(@Ctx() { currentUser }: contextType): Promise<User> {
    // si currentUser est null, on renvoi une exeption
    if(typeof currentUser !== "object") {
      throw new ApolloError("Vous devez être connecté !!!");
    }
    return currentUser;
  }
}
