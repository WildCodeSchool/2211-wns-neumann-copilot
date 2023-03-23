import { useState } from "react";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";
import { Link } from "react-router-dom";
import "../css/login.css"
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import LeftMenuPC from "../Components/LeftMenuPC";

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

  return (
    <div>
      {window.innerWidth < 992 ? <Header></Header> : <LeftMenuPC></LeftMenuPC>}
      {currentUser?.profile ? (
        <div>
          {" "}
          <p> connected as {currentUser.profile.email}</p>
          <button 
            className="button button_connexion"
            onClick={async () => {
              await logout();
              client.resetStore();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="main">
          <h1>Connexion</h1>
          <form className="form"
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
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
              />
              </div>
            {error && <p>{error}</p>}
          <div className="redirection_sign_up">
                <p>Pas encore de compte ?</p>&nbsp;<Link to="/Inscription">Inscription</Link>
          </div>
            <div>
              <button className="button button_connexion" type="submit">Connexion</button>
            </div>
          </form>
        </div>
      )}
      {window.innerWidth < 992 ? <Footer></Footer> : ''}
    </div>
  );
}
