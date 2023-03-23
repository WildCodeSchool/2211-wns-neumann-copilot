// import { useState } from "react"
// import { useLoginMutation } from "../gql/generated/schema"
import { Link } from "react-router-dom";
import "../css/Connexion.css"
import Inscription from "./Inscription";

export default function Connexion() {
    
  
    return (
    <div className="main">
        <h1>Connexion</h1>

        <div className="container_form">
            <div className="form">
                <div className="input_connexion">
                    <input type="email" name="email" placeholder="Votre adresse email"/>
                </div>
                <div className="input_connexion">
                    <input type="password" name="password" placeholder="Votre mot de passe"/>
                </div>
                <div>
                    <button className="button button_connexion">Connexion</button>
                </div>
            </div>
            <div className="redirection_sign_up">
            <p>Pas encore de compte ?</p>&nbsp;<Link to="/Inscription">Inscription</Link>
            </div>
        </div>
    </div>
)}