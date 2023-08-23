import {
  Arg,
  Authorized,
  Int,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import datasource from "../db";
import User, {
  UserInput,
  UserUpdateInput,
  encodePassword,
  verifyPassword,
  UserRole,
  UserUpdateNativeInput,
  NotificationInput,
} from "../entity/User";
import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-errors";
import { env } from "../env";
import { ContextType } from "../index";
import { Expo } from 'expo-server-sdk';

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

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
  async login(
    @Arg("data") { email, password }: UserInput,
    @Ctx() { res }: ContextType
  ): Promise<string> {
    const user = await datasource.getRepository(User).findOneBy({ email });

    if (
      user === null ||
      !(await verifyPassword(password, user.hashedPassword))
    ) {
      throw new ApolloError("invalid credentials", "INVALID_CREDS");
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    // reponse via cookie (nom, valeur, options) / secure empeche le navigateur d'interpreter un cookie si on est pas en https
    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });
    console.log(token);
    console.log(email);


    return token;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: ContextType): Promise<boolean> {
    res.clearCookie("token");
    return true;
  }

  // // requete authentifié a partir d'appolostudio pour recupere le token

  // // la query n'est realiser que si on a les autorisation (on peu mettre des role dans les () pour donner des condition plus précise sur les autorisation)
  @Authorized()
  @Query(() => User)
  async profile(@Ctx() { currentUser }: ContextType): Promise<User> {
    // si currentUser est null, on renvoi une exception
    if (typeof currentUser !== "object") {
      throw new ApolloError("Vous devez être connecté !!!");
    }
    return currentUser;
  }

  @Authorized()
  @Mutation(() => User)
  async updateProfile(
    @Ctx() { currentUser }: ContextType,
    @Arg("data", { validate: false }) { expoNotificationsToken }:
      UserUpdateNativeInput): Promise<User> {
    return await datasource.getRepository(User).save({ ...currentUser, expoNotificationsToken });
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Ctx() { currentUser }: ContextType,
    @Arg("data") data: UserUpdateInput
  ): Promise<User> {
    if (typeof currentUser !== "object") {
      throw new ApolloError("Vous devez être connecté !!!");
    }
    const userToUpdate = await datasource
      .getRepository(User)
      .findOne({ where: { id: currentUser.id } });
    if (userToUpdate === null) throw new ApolloError("Account unavailable");

    return await datasource.getRepository(User).save({
      ...userToUpdate, ...data
    });
  }

  // mutation générique pour envoyer une notification
  @Mutation(() => Boolean)
  async sendNotification(
    @Arg('data', { validate: false }) data: NotificationInput,
    @Arg('userId', () => Int) userId: number
  ): Promise<boolean> {
    const user = await datasource.getRepository(User).findOne({ where: { id: userId } })
    if (user === null) throw new Error("user not found");
    if (user.expoNotificationsToken === null || typeof (user.expoNotificationsToken) === "undefined")
      throw new Error("expo notification not found for this user");
    await expo.sendPushNotificationsAsync([{
      to: user.expoNotificationsToken,
      title: data.title,
      body: data.body,
      data: typeof data.JSONPayload === 'string' ? JSON.parse(data.JSONPayload) : undefined,
    }]);
    return true;
  }
}
