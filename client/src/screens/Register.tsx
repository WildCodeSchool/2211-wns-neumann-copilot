import { Link, useNavigate } from "react-router-dom";
import "./css/register.css";
import {
  useCreateUserMutation,
  useGetProfileQuery,
  LoginMutation,
  useLoginMutation,
} from "../gql/generated/schema";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [create_user] = useCreateUserMutation();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const isAdmin = currentUser?.profile.role === "admin";
  const [login] = useLoginMutation();

  return (
    <div>
      <div className="main">
        <h1>Inscription</h1>
        <div className="container_form">
          <form
            className="form_register"
            onSubmit={async (e) => {
              if (confirmPassword !== password) {
                alert("Mot de passe différent");
              } else {
                e.preventDefault();
                setError("");
                try {
                  await create_user({
                    variables: { data: { email, password } },
                  });
                } catch (err) {
                  console.error(err);
                  setError("invalid credentials");
                } finally {
                  client.resetStore();
                  await login({ variables: { data: { email, password } } });
                  navigate("/profil");
                }
              }
            }}
          >
            <div className="input_inscription">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
              />
            </div>
            <div className="input_inscription">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
              />
            </div>
            <div className="input_inscription">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmer votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p>{error}</p>}
            <div className="redirection_sign_in">
              <p>Déjà un compte ?</p>&nbsp;<Link to="/login">Connexion</Link>
            </div>
            <div>
              <button className="button button_inscription">Inscription</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
