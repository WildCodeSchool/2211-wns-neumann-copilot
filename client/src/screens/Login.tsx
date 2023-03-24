import { useState } from "react";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // import de la mutation login.gql
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const isAdmin = currentUser?.profile.role === "admin";
  console.log(currentUser);

  return (
    <div>
      {currentUser?.profile ? (
        <div>
          {" "}
          <p> connected as {currentUser.profile.email}</p>
          <button
            onClick={async () => {
              await logout();
              client.resetStore();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log({ email, password });
            setError("");
            try {
              await login({ variables: { data: { email, password } } });
            } catch (err) {
              console.error(err);
              setError("invalid credentials");
            } finally {
              client.resetStore();
            }
          }}
        >
          <label htmlFor="email">
            email :
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            password :
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p>{error}</p>}
          <button type="submit">Log in</button>
        </form>
      )}
      <div> {isAdmin && <p>C'est le boss</p>}</div>
    </div>
  );
}
