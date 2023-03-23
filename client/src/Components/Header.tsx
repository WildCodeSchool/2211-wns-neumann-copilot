import "./css/Header.css";
import LogoCopilote from "../img/LogoCopilote.svg";
import BarreMenu from "../img/BarreMenu.png";
import StandardProfil from "../img/StandardProfil.svg";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <img src={BarreMenu} alt="logo de Copilote" className="menu" />
            {/* <Link to={"/App"}> */}
            <img src={LogoCopilote} alt="logo de Copilote" className="logo" />
            {/* </Link> */}
            {/* <Link to={"/Login"}> */}
            <img src={StandardProfil} alt="logo de Copilote" className="profil-img" />
            {/* </Link> */}
        </div>
    );
}
export default Header;