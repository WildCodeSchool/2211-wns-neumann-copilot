import "./css/Home.css";
import ImageDeCovoiturage from "../img/ImageDeCovoiturage.svg";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../gql/generated/schema";
import { log } from "console";

function Home() {
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  console.log("toto");

  return (
    <div>
      <div className="app">
        <h1>Bienvenue chères Copilote !</h1>
        <img
          src={ImageDeCovoiturage}
          alt="véhicule avec quatre personnes à l'intérieur"
        />
        <div>
          <h2>Recherchez, cliquez et covoiturez !</h2>
          <p>
            Trouver un trajet devient encore plus simple ! Facile d'utilisation
            et dotée de technologies avancées, notre appli vous permet de
            trouver un trajet à proximité en un rien de temps.
          </p>
        </div>
        <Link to={currentUser?.profile ? "/trajet" : "/login"}>
          <button className="button">Trajet</button>
        </Link>
      </div>
    </div>
  );
}
export default Home;
