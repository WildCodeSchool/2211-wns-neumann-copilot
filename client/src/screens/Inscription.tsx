// import { useState } from "react"
// import { useLoginMutation } from "../gql/generated/schema"
import { Link } from "react-router-dom";
import "./css/Inscription.css"
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import LeftMenuPC from "../Components/LeftMenuPC";

export default function Loginn() {
    return (
        <div>
        {window.innerWidth < 992 ? <Header></Header> : <LeftMenuPC></LeftMenuPC>}
        <div className="main">
            <h1>Inscription</h1>

            <div className="container_form">
                <form className="form">
                    <div className="input_inscription">
                        <input type="email" name="email" placeholder="Votre adresse email"/>
                    </div>
                    <div className="input_inscription">
                        <input type="password" name="password" placeholder="Votre mot de passe"/>
                    </div>
                    <div className="redirection_sign_in">
                <p>Déjà un compte ?</p>&nbsp;<Link to="/login">Connexion</Link>
                </div>
                    <div>
                        <button className="button button_inscription">Connexion</button>
                    </div>
                </form>
            </div>
        </div>
        {window.innerWidth < 992 ? <Footer></Footer> : ''}
    </div>
)}