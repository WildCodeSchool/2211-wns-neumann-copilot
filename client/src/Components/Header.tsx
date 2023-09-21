import "./css/Header.css";
import LogoCopilote from "../img/LogoCopilote.png";
import StandardProfil from "../img/StandardProfil.svg";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../gql/generated/schema";
import { useState } from "react";

function Header() {
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="header">
        <div className="menu-burger" id="menu-burger" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
        </div>
        <Link to={"/"}>
          <img src={LogoCopilote} alt="logo de Copilote" className="logo" />
        </Link>
        <Link to={currentUser?.profile ? "/Profil" : "/login"}>
          <img
            src={StandardProfil}
            alt="logo de Copilote"
            className="profil-img"
          />
        </Link>
      </div>
      <ul className={`menu ${isMenuOpen ? "open" : ""}`} id="menu">
        <li>
          <Link to="/" onClick={toggleMenu}>
            Accueil
          </Link>
        </li>
        <span></span>
        <li>
          <Link to={currentUser ? "/trajet" : "/login"} onClick={toggleMenu}>
            Trajets
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Header;
