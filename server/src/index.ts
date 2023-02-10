import "reflect-metadata";
import db from "./db";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { join } from "path";
import type express from "express";
import jwt from 'jsonwebtoken';
import { env } from "./env";
import User from "./entity/User";

export interface JWTPayload {
  userId: number;
}

export interface contextType {
  req: express.Request;
  res: express.Response;
  jwt?: JWTPayload;
  currentUser?: User;
}

async function start(): Promise<void> {
  await db.initialize();

  const schema = await buildSchema({
    resolvers: [join(__dirname, "/resolvers/*.ts")],
    authChecker: async ({ context }: {context: contextType}) => {
      const {req: {headers}} = context;
      // recupere le jwt
      const tokenInAuthHeaders = headers.authorization?.split(" ")[1];
      const token = tokenInAuthHeaders;

      // verification que le token n'est pas vide
      if (typeof token === 'string') {
        // verifie si le token est valide et le decode (donc on sait s'il est valide ou non)
        const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as JWTPayload;
        if(typeof decoded === "object") {
          // si on a bien notre token decodé, on le met dans le contexte pour pouvoir le reutiliser
          context.jwt = decoded;
        }
        // recuperation des infos de l'utilisateur courrant
        const currentUser = await db.getRepository(User).findOneBy({id: decoded.userId})
        if (currentUser !== null) {
          // on met les infos de l'utilisateur dans le contexte
          context.currentUser = currentUser;
        }
        return true
      }
      return false;
    }
  });
  console.log(schema);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: ({ req, res }) => ({ req, res }),
    cors: {
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
      credentials: true,
    },
  });
  console.log(env.CORS_ALLOWED_ORIGINS);
  

  await server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start().catch(console.error);
