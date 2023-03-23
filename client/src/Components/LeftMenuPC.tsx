import "./css/LeftMenuPC.css";
import LogoCopilote from "../img/LogoCopilote.svg";
import StandardProfil from "../img/StandardProfil.svg";

function LeftMenuPC() {
    return (
        <div className="left-menu-pc">
            <img src={LogoCopilote} alt="logo de Copilote" className="logo" />
            <img src={StandardProfil} alt="logo de Copilote" className="profil-img" />
        </div>
    );
}
export default LeftMenuPC;