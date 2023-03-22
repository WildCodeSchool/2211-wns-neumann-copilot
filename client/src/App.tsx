import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
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
      <Header></Header>
      <div className="app">
        <h1>Bienvenue chères Copilote !</h1>
        <img src={ImageDeCovoiturage} alt="véhicule avec quatre personnes à l'intérieur" />
        <h2>Recherchez, cliquez et covoiturez !</h2>
        <p>Trouver un trajet devient encore plus simple ! Facile d'utilisation et dotée de technologies avancées, notre appli vous permet de trouver un trajet à proximité en un rien de temps.</p>
        <button>Trajet</button>
      </div>
      <Footer></Footer>
      {/* <header className="App-header"></header>
        <p>
          {users.map((user) => {
            return user.id;
          })}
        </p>
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes> */}
    </div>
  );
}
export default App;
