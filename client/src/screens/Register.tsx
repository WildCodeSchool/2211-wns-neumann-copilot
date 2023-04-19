import { Link, useNavigate } from "react-router-dom";
import "./css/register.css"
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import LeftMenuPC from "../Components/LeftMenuPC";
import { useCreateUserMutation, useGetProfileQuery } from "../gql/generated/schema";
import { useState } from "react";

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [create_user] = useCreateUserMutation();
    const { data: currentUser, client } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    const isAdmin = currentUser?.profile.role === "admin";
    console.log(currentUser);

    return (
        <div>
            {window.innerWidth < 992 ? <Header></Header> : <LeftMenuPC></LeftMenuPC>}
            <div className="main">
                <h1>Inscription</h1>
                <div className="container_form">
                    <form
                        className="form_register"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setError("");
                            try {
                                await create_user({ variables: { data: { email, password } } });
                            } catch (err) {
                                console.error(err);
                                setError("invalid credentials");
                            } finally {
                                client.resetStore();
                                navigate('/login');
                            }
                        }}
                    >
                        <div className="input_inscription">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Votre adresse email"
                            />
                        </div>
                        <div className="input_inscription">
                            <input
                                type="text"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Votre mot de passe"
                            />
                        </div>
                        <div className="input_inscription">
                            <input
                                type="text"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Confirmer votre mot de passe"
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
            {window.innerWidth < 992 ? <Footer></Footer> : ''}
            <div> {isAdmin && <p>C'est le boss</p>}</div>
        </div>
    )
}