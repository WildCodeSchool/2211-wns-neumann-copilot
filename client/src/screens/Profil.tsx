import { useState } from "react"
import { useLoginMutation } from "../gql/generated/schema"
import blank_profile from "../assets/avatar.png"
import "../css/Profil.css"

export default function Profil() {
    
  
    return (
    <div className="main">
        <div className="container_avatar">
            <div className="avatar">
                <img src={blank_profile} alt="Profil-image" />
            </div>
        </div>
        <div className="container_information">
        <div className="input">
                <label htmlFor="firstname" className="placeholder">Prénom</label>
                <input name="firstname" type="text"/>
            </div>
            <div className="input">
                <label htmlFor="name" className="placeholder">Nom</label>
                <input name="name" type="text"/>
            </div>
            <div className="input">
                <label htmlFor="email" className="placeholder">Email</label>
                <input type="email" name="email"/>
            </div>
            <div className="input">
                <label htmlFor="age" className="placeholder">Age</label>
                <input name="age" type="number"/>
            </div>
            <div className="input_description">
                <label htmlFor="description" className="placeholder_description">Description</label>
                <textarea name="descrition" ></textarea>
            </div>
        </div>
        <div className="button_deconnexion">
            <input type="button" name="deconnexion" value="Deconnexion"/>
        </div>
    </div>
)}