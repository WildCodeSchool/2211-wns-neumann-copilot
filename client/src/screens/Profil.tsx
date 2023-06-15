import blank_profile from "../assets/avatar.png";
import "./css/Profil.css";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useLogoutMutation,
  useUpdateUserMutation,
} from "../gql/generated/schema";
import { useEffect, useState } from "react";

export default function Profil() {
  const [logout] = useLogoutMutation();
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [updateProfil] = useUpdateUserMutation();
  const [email, setEmail] = useState("");
  const [lastName, setlastName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [profileDescription, setprofileDescription] = useState("");
  const [profilePicture, setprofilePicture] = useState("");
  const [age, setage] = useState("");
  // const [password, setpassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.profile.email);
      setfirstName(currentUser.profile.firstName || "");
      setlastName(currentUser.profile.lastName || "");
      setprofileDescription(currentUser.profile.profileDescription || "");
      setage(currentUser.profile.age || "");
    }
  }, [currentUser]);

  return (
    <>
      <form
        className="main_profil"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          try {
            await updateProfil({
              variables: {
                data: {
                  email,
                  firstName,
                  lastName,
                  profileDescription,
                  profilePicture,
                  age,
                },
              },
            });
          } catch (err) {
            console.error(err);
            setError("invalid credentials");
          } finally {
            client.resetStore();
            navigate("/profil");
          }
        }}
      >
        <div className="container_avatar">
          <img src={blank_profile} alt="Profil-image" />
        </div>
        <div className="container_information">
          {/* First Name */}
          <div className="input">
            <input
              name="firstname"
              type="text"
              placeholder={
                currentUser?.profile.firstName === null
                  ? "Prénom"
                  : currentUser?.profile.firstName
              }
              onChange={(e) => setfirstName(e.target.value)}
              value={firstName}
            />
          </div>

          {/* Last Name */}
          <div className="input">
            <input
              name="lastname"
              type="text"
              placeholder={
                currentUser?.profile.lastName === null
                  ? "Nom"
                  : currentUser?.profile.lastName
              }
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
            />
          </div>

          {/* Email */}
          <div className="input">
            <input
              type="email"
              name="email"
              placeholder={
                currentUser?.profile.email === null
                  ? "Email"
                  : currentUser?.profile.email
              }
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Age */}
          <div className="input">
            <input
              name="age"
              type="text"
              placeholder={
                currentUser?.profile.age === null
                  ? "Votre age"
                  : currentUser?.profile.age
              }
              onChange={(e) => setage(e.target.value)}
              value={age}
            />
          </div>

          {/* Description */}
          <div className="input_description">
            <textarea
              name="description"
              placeholder={
                currentUser?.profile.profileDescription === null
                  ? "Votre description"
                  : currentUser?.profile.profileDescription
              }
              onChange={(e) => setprofileDescription(e.target.value)}
              value={profileDescription}
            ></textarea>
          </div>
        </div>
        <div className="button_edit">
          <button className="button button_edit_profil" type="submit">
            Modifier
          </button>
        </div>
      </form>
      <div className="button_deconnexion">
        <button
          className="button"
          onClick={async () => {
            await logout();
            client.resetStore();
          }}
        >
          <Link to="/">Deconnexion</Link>
        </button>
      </div>
    </>
  );
}
