import "./css/Header.css";
import LogoCopilote from "../img/LogoCopilote.png";
import MenuBurger from "../img/MenuBurger.svg";
import StandardProfil from "../img/StandardProfil.svg";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../gql/generated/schema";

function Header() {
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  return (
    <div className="header">
      <img src={MenuBurger} alt="Menu Burger logo" className="menu" />
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
  );
}
export default Header;
