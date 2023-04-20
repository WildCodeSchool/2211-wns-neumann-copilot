import { Link } from "react-router-dom";
import blank_profile from "../assets/avatar.png";
import { useGetProfileQuery, UpdateUserDocument } from "../gql/generated/schema";
import "./css/Edit.css"

export default function Edit() {

    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
      });


    return (
        <>
            <div className="update_profil_main">
                <div className="container_avatar">
                    <img src={blank_profile} alt="Profil-image"/>
                </div>
                <div className="container_information">
                    <div className="input">
                        <input name="firstname" type="text" value={currentUser?.profile.firstName===null?"Prénom":currentUser?.profile.firstName} onChange={} />
                    </div>
                    <div className="input">
                        <input name="lastname" type="text" placeholder="Nom" value={currentUser?.profile.lastName===null?"Nom":currentUser?.profile.lastName} />
                    </div>
                    <div className="input">
                        <input type="email" name="email" placeholder="Email" value={currentUser?.profile.email} />
                    </div>
                    <div className="input">
                        <input name="age" type="text" placeholder="Age" disabled/>
                    </div>
                    <div className="input_description">
                        <textarea name="descrition"  value={currentUser?.profile.profileDescription===null?"Votre description":currentUser?.profile.profileDescription} ></textarea>
                    </div>
                </div>
                <div className="button_edit">
                    <button className="button button_update_profil"><Link to="/profil">Modifier</Link></button>
                </div>            
            </div>
        </>
)}