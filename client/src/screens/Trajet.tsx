import Footer from "../Components/Footer";
import Header from "../Components/Header";
import LeftMenuPC from "../Components/LeftMenuPC";
import "./css/Trajet.css";

function Trajet() {
    return (
        <div className="trajet">
            {window.innerWidth < 992 ? <Header></Header> : <LeftMenuPC></LeftMenuPC>}
            <div className="app">
                <p>La page des trajets ici !!!</p>
            </div>
            {window.innerWidth < 992 ? <Footer></Footer> : ''}
        </div>
    );
}
export default Trajet;