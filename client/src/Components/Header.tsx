import "./css/Header.css";
import LogoCopilote from "../img/LogoCopilote.svg";
import BurgerMenu from "../img/BurgerMenu.svg";
import StandardProfil from "../img/StandardProfil.svg";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../gql/generated/schema";

function Header() {
    
    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    console.log(currentUser);

    return (
        <div className="header">
            <img src={BurgerMenu} alt="logo de Copilote" className="menu" />
            <Link to={"/"}>
                <img src={LogoCopilote} alt="logo de Copilote" className="logo" />
            </Link>
            <Link to={currentUser?.profile ? "/Profil" : "/login"}>
                <img src={StandardProfil} alt="logo de Copilote" className="profil-img" />
            </Link>
        </div>
    );
}
export default Header;