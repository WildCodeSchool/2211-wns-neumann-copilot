import "./css/LeftMenuPC.css";
import LogoCopilote from "../img/LogoCopilote.svg";
import StandardProfil from "../img/StandardProfil.svg";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../gql/generated/schema";
import { MdDirectionsCar, MdHome } from "react-icons/md";

function LeftMenuPC() {
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <div className="left-menu-pc">
      <div>
        <Link to={"/"}>
          <img src={LogoCopilote} alt="logo de Copilote" className="logo" />
        </Link>
        <div className="option-liste">
          <Link to={"/"}>
            <div className="option">
              <MdHome />
              Acceuil
            </div>
          </Link>
          <Link to={currentUser?.profile ? "/trajet" : "/login"}>
            <div className="option">
              <MdDirectionsCar />
              Trajet
            </div>
          </Link>
        </div>
      </div>
      <div>
        <Link to={currentUser?.profile ? "/Profil" : "/login"}>
          <img
            src={StandardProfil}
            alt="logo de Copilote"
            className="profil-img"
          />
        </Link>
        <p>Copyright 2023 by J-R, Rémy et Florian</p>
      </div>
    </div>
  );
}
export default LeftMenuPC;
