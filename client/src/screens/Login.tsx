import { useState } from "react";
import { useGetProfileQuery, useLoginMutation } from "../gql/generated/schema";
import { Link, useNavigate } from "react-router-dom";
import "./css/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // import de la mutation login.gql
  const [login] = useLoginMutation();
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <div>
      <div className="main">
        <h1>Connexion</h1>
        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            try {
              await login({ variables: { data: { email, password } } });
              login() === null || undefined
                ? setError("invalid credentials")
                : navigate("/profil");
            } catch (err) {
              console.error(err);
              setError("invalid credentials");
            } finally {
              client.resetStore();
              navigate("/profil");
            }
          }}
        >
          <div className="input_connexion">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
            />
          </div>
          <div className="input_connexion">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
            />
          </div>
          {error && <p>{error}</p>}
          <div className="redirection_sign_up">
            <p>Pas encore de compte ?</p>&nbsp;
            <Link to="/Register">Inscription</Link>
          </div>
          <div>
            <button
              className="button button_connexion"
              type="submit"
              name="Login"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
