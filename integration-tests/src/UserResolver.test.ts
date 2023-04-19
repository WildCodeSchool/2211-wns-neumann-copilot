import { gql } from "@apollo/client/core";
import User from "../../server/src/entity/User";
import client from "./appolloClient";
import db from "../../server/src/db";

const createUserMutation = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
      email
    }
  }
`;

const readUserQuery = gql`
query Query {
  getUsers {
    email
  }
}
`;

describe("User resolver", () => {
  describe("create user", () => {
    it("should create user given valid attributes", async () => {
      const res = await client.mutate({
        mutation: createUserMutation,
        variables: { data: { email: "test123456@test.fr", password:"Superlesoleil"}},
      });
      expect(res.data?.createUser).toHaveProperty("id");
      expect(res.data?.createUser).toHaveProperty("email");
    });


    it("should not create user given invalid attributes and return an error", async () => {
      expect(() =>
        client.mutate({
        mutation: createUserMutation,
        variables: { data: { email: "" } }
      })).
      rejects.toThrowErrorMatchingInlineSnapshot(`"Response not successful: Received status code 400"`)
      });
      });

  describe("read user", () => {
    it("should return an array", async () => {
      await db
        .getRepository(User)
        .insert([{ email: "test@test11111.fr", hashedPassword: 'Superlesoleil'}]);

      const res = await client.query({
        query: readUserQuery,
        fetchPolicy: "no-cache",
      });

      expect(res.data.getUsers.length).toBe(1);
      res?.data?.getUsers.forEach((w: User) => {
        expect(w).toHaveProperty("email");
      });
    });
  });
});