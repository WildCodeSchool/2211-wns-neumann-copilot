import { CarPool } from "../gql/generated/schema";
import "./css/CarpoolList.css";
type carPoolsListProps = {
  carPoolsList?: CarPool[];
};
export default function CarpoolList({ carPoolsList }: carPoolsListProps) {
  console.log("LALALALAL");

  return (
    <div className="app main-carpool-list">
      {carPoolsList &&
        carPoolsList.map((carPool: CarPool) => (
          <div key={carPool.id} className="carPoolCard">
            <div className="carPoolCard-departure">
              <p>Départ : {carPool.departureCity}</p>
            </div>
            <div className="carPoolCard-arrival">
              <p> Arivée : {carPool.arrivalCity}</p>
            </div>
            <div className="carPoolCard-time">
              <p> Date & Heure : {carPool.departureDateTime}</p>
            </div>
            <div className="carPoolCard-passager">
              <p> Nombre de passager : {carPool.passengerNumber}</p>
            </div>
            <div className="carPoolCard-distance">
              <p> Distance : {carPool.passengerNumber} km</p>
            </div>
          </div>
        ))}
    </div>
  );
}
