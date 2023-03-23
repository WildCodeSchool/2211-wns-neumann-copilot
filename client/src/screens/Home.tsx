import "./css/Home.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ImageDeCovoiturage from "../img/ImageDeCovoiturage.svg"
import LeftMenuPC from "../Components/LeftMenuPC";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <div className="pc">
                {/* window.innerWidth recupere la taille de la fenêtre */}
                {window.innerWidth < 992 ? <Header></Header> : <LeftMenuPC></LeftMenuPC>}
                <div className="app">
                    <h1>Bienvenue chères Copilote !</h1>
                    <img src={ImageDeCovoiturage} alt="véhicule avec quatre personnes à l'intérieur" />
                    <div>
                        <h2>Recherchez, cliquez et covoiturez !</h2>
                        <p>Trouver un trajet devient encore plus simple ! Facile d'utilisation et dotée de technologies avancées, notre appli vous permet de trouver un trajet à proximité en un rien de temps.</p>
                    </div>
                    <Link to={"/trajet"}>
                        <button className="button">Trajet</button>
                    </Link>
                </div>
            </div>
            {window.innerWidth < 992 ? <Footer></Footer> : ''}
        </div>
    );
}
export default Home;