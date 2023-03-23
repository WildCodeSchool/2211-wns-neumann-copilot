import "./css/LeftMenuPC.css";
import LogoCopilote from "../img/LogoCopilote.svg";
import StandardProfil from "../img/StandardProfil.svg";
import IconHome from "../img/IconHome.svg";
import IconVoiture from "../img/IconVoiture.svg";
import { Link } from "react-router-dom";

function LeftMenuPC() {
    return (
        <div className="left-menu-pc">
            <div>
                <Link to={"/"}>
                    <img src={LogoCopilote} alt="logo de Copilote" className="logo" />
                </Link>
                <div className="option-liste">
                    <Link to={"/"}>
                        <div className="option">
                            <img src={IconHome} alt="icon en forme de maison" />
                            <p>Acceuil</p>
                        </div>
                    </Link>
                    <Link to={"/trajet"}>
                        <div className="option">
                            <img src={IconVoiture} alt="icon de voiture" />
                            <p>Trajet</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div>
                <Link to={"/login"}>
                    <img src={StandardProfil} alt="logo de Copilote" className="profil-img" />
                </Link>
                <p>Copyright 2023 by J-R, Rémy et Florian</p>
            </div>
        </div>
    );
}
export default LeftMenuPC;