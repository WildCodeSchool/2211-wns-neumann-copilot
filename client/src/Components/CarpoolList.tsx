import { CarPool } from "../gql/generated/schema";
import "./css/CarpoolList.css";
type carPoolsListProps = {
  carPoolsList?: CarPool[];
};
export default function CarpoolList({ carPoolsList }: carPoolsListProps) {
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
          </div>
        ))}
    </div>
  );
}
