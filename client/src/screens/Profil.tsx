// import { useState } from "react"
// import { useLoginMutation } from "../gql/generated/schema"
import blank_profile from "../assets/avatar.png"
import "./css/Profil.css"
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../gql/generated/schema";

export default function Profil() {  

    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
      });
    return (
        <div>
        <div className="main_profil">
            <div className="container_avatar">
                <img src={blank_profile} alt="Profil-image"/>
            </div>
            <div className="container_information">
                <div className="input">
                    <input name="firstname" type="text" value={currentUser?.profile.firstName===null?"Prénom":currentUser?.profile.firstName} disabled/>
                </div>
                <div className="input">
                    <input name="lastname" type="text" placeholder="Nom" value={currentUser?.profile.lastName===null?"Nom":currentUser?.profile.lastName} disabled/>
                </div>
                <div className="input">
                    <input type="email" name="email" placeholder="Email" value={currentUser?.profile.email} disabled/>
                </div>
                <div className="input">
                    <input name="age" type="text" placeholder="Age" disabled/>
                </div>
                <div className="input_description">
                    <textarea name="descrition"  value={currentUser?.profile.profileDescription===null?"Votre description":currentUser?.profile.profileDescription} disabled></textarea>
                </div>
            </div>
            <div className="button_edit">
                <button className="button button_edit_profil"><Link to="/update_profil">Modifier</Link></button>
            </div>
            <div className="button_deconnexion">
                <button className="button">Deconnexion</button>
            </div>
            
        </div>
    </div>
)}