import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Profil from "./screens/Profil";
import "./App.css";
import { useGetUsersQuery } from "./gql/generated/schema";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ImageDeCovoiturage from "./img/ImageDeCovoiturage.svg"

function App() {
  const { data } = useGetUsersQuery();
  const users = data?.getUsers || [];
  console.log(users);
  return (
    <div className="App">
      {/* window.innerWidth recupere la taille de la fenêtre */}
      {window.innerWidth < 992 ? <Header></Header> : ''}
      <div className="app">
        <h1>Bienvenue chères Copilote !</h1>
        <img src={ImageDeCovoiturage} alt="véhicule avec quatre personnes à l'intérieur" />
        <div>
          <h2>Recherchez, cliquez et covoiturez !</h2>
          <p>Trouver un trajet devient encore plus simple ! Facile d'utilisation et dotée de technologies avancées, notre appli vous permet de trouver un trajet à proximité en un rien de temps.</p>
        </div>
        <button className="button">Trajet</button>
      </div>
      {window.innerWidth < 992 ? <Footer></Footer> : ''}

      {/* <header className="App-header"></header>
        <p>
          {users.map((user) => {
            return user.id;
          })}
        </p>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Profil" element={<Profil />} />
        </Routes> */}
    </div>
  );
}
export default App;
