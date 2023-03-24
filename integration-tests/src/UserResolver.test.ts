import { gql } from "@apollo/client/core";
import User from "../../server/src/entity/User";
import client from "./appolloClient";
import db from "../../server/src/db";

const createUserMutation = gql`
  mutation createUser($data: UserInput!) {
    createuser(data: $data) {
      id
      email
    }
  }
`;

const readUserQuery = gql`
  query User {
    User {
      id
      email
    }
  }
`;

describe("User resolver", () => {
  describe("create user", () => {
    it("should create user given valid attributes", async () => {
      const res = await client.mutate({
        mutation: createUserMutation,
        variables: { data: { email: "test@test.fr" } },
      });

      expect(res.data?.createUser).toHaveProperty("id");
      expect(res.data?.createUser).toHaveProperty("email");
    });

    it("should not create wilder given invalid attributes and return an error", async () => {
      expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: { data: { email: "" } },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Argument Validation Error"`
      );
    });
  });

  describe("read user", () => {
    it("should return an array", async () => {
      await db
        .getRepository(User)
        .insert([{ email: "jojo" }, { email: "jaja" }]);

      const res = await client.query({
        query: readUserQuery,
        fetchPolicy: "no-cache",
      });

      expect(res.data.user.length).toBe(2);
      res?.data?.user.forEach((w: User) => {
        expect(w).toHaveProperty("id");
        expect(w).toHaveProperty("email");
      });
    });
  });
});