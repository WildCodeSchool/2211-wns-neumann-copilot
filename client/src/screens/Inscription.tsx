// import { useState } from "react"
// import { useLoginMutation } from "../gql/generated/schema"
import { Link } from "react-router-dom";
import "../css/Inscription.css"

export default function Loginn() {
    
  
    return (
    <div className="main">
        <h1>Inscription</h1>

        <div className="container_form">
            <div className="form">
                <div className="input_inscription">
                    <input type="email" name="email" placeholder="Votre adresse email"/>
                </div>
                <div className="input_inscription">
                    <input type="password" name="password" placeholder="Votre mot de passe"/>
                </div>
                <div>
                    <button className="button button_inscription">Connexion</button>
                </div>
            </div>
            <div className="redirection_sign_in">
            <p>Déjà un compte ?</p>&nbsp;<Link to="/Connexion">Connexion</Link>
            </div>
        </div>
    </div>
)}