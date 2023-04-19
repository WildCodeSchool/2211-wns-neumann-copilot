// import { useState } from "react"
// import { useLoginMutation } from "../gql/generated/schema"
import blank_profile from "../assets/avatar.png"
import "./css/Profil.css"
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LeftMenuPC from "../Components/LeftMenuPC";
import { Link } from "react-router-dom";

export default function Profil() {  
    return (
        <div>
        {window.innerWidth < 992 ? <Header></Header> : <LeftMenuPC></LeftMenuPC>}
        <div className="main_profil">
            <div className="container_avatar">
                <img src={blank_profile} alt="Profil-image" />
            </div>
            <div className="container_information">
                <div className="input">
                    <input name="firstname" type="text" placeholder="Prénom"/>
                </div>
                <div className="input">
                    <input name="name" type="text" placeholder="Nom"/>
                </div>
                <div className="input">
                    <input type="email" name="email" placeholder="Email"/>
                </div>
                <div className="input">
                    <input name="age" type="text" placeholder="Age"/>
                </div>
                <div className="input_description">
                    <textarea name="descrition" placeholder="Description"></textarea>
                </div>
            </div>
            <div className="button_edit">
                <button className="button button_edit_profil"><Link to="/edit_profil">Modifier</Link></button>
            </div>
            <div className="button_deconnexion">
                <button className="button">Deconnexion</button>
            </div>
            
        </div>
        {window.innerWidth < 992 ? <Footer></Footer> : ''}
    </div>
)}