import { Link } from "react-router-dom";
import blank_profile from "../assets/avatar.png";
import { useGetProfileQuery, useUpdateUserMutation, UserInput } from "../gql/generated/schema";
import "./css/Edit.css"
import React, { useState, FormEvent} from "react";
export default function Edit() {

    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
      });

    const [updateUser] = useUpdateUserMutation();

    const [editedUser, setEditedUser] = useState<UserInput>();
    // const save = () =>
    // updateUser({
    //   variables: {
    //     updateUserId: parseInt(id, 10),
    //     data: {
    //       lastName,
    //       firstName,
    //       profileDescription,
    //       email,
    //       profilePicture
    //     },
    //   },
    //   onCompleted: () => {
    //     toast.success("Wilder saved");
    //     navigate(`/wilders/${id}`);
    //   },
    //   onError: (err) => {
    //     console.error(err);
    //     toast.error("error while saving wilder");
    //   },
    //   refetchQueries: [
    //     { query: WilderDocument, variables: { wilderId: parseInt(id, 10) } },
    //   ],
    // });
    console.log(currentUser);
    
    return (
        <>
            {/* <div className="update_profil_main">
                    <div className="container_avatar">
                        <img src={editedUser.profilePicture || blank_profile} alt={editedWilder.lastName}/>
                    </div>
                    <div className="container_information">
                        <div className="input">
                            <input name="firstname" type="text" placeholder={currentUser?.profile.firstName===null?"Prénom":currentUser?.profile.firstName} onChange={(e) =>setEditedUser({ ...editedUser, firstName: e.target.value})}/>
                        </div>
                        <div className="input">
                            <input name="lastname" type="text" placeholder={currentUser?.profile.lastName===null?"Nom":currentUser?.profile.lastName} onChange={(e) =>setEditedUser({ ...editedUser, lastName: e.target.value})}/>
                        </div>
                        <div className="input">
                            <input type="email" name="email"  placeholder={currentUser?.profile.email} onChange={(e) =>setEditedUser({ ...editedUser, email: e.target.value})}/>
                        </div>
                        <div className="input">
                            <input name="age" type="text" placeholder="Age" disabled/>
                        </div>
                        <div className="input_description">
                            <textarea name="descrition"  placeholder={currentUser?.profile.profileDescription===null?"Votre description":currentUser?.profile.profileDescription} onChange={(e) =>setEditedUser({ ...editedUser, profileDescription: e.target.value})}></textarea>
                        </div>
                    </div>
                    <div className="button_edit">
                        <button className="button button_update_profil" onClick={save}><Link to="/profil">Modifier</Link></button>
                    </div>           
            </div> */}
        </>
)}