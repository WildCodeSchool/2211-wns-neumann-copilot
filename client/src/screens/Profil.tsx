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
  console.log(currentUser);
  return (
    <>
      <div className="main">
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
            } catch (error) {
              console.error(error);
              setError("invalid credentials");
            } finally {
              client.resetStore();
              if (error) {
                return navigate("/login");
              }
              return navigate("/profil");
            }
          }}
        >
          <div className="container_avatar">
            <img src={blank_profile} alt="Profil" />
          </div>
          <div className="container_information">
            {/* First Name */}
            <div className="input">
              <input
                id="firstName"
                name="firstname"
                title="firstName"
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
                id="lastName"
                name="lastname"
                title="lastName"
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
                id="email"
                title="email"
                type="email"
                name="email"
                id="email"
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
                id="age"
                name="age"
                title="age"
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
                id="description"
                name="description"
                title="profileDescription"
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
      </div>
    </>
  );
}
