import { GetCarPoolByCitiesQuery } from "../gql/generated/schema";
import "./css/CarpoolList.css";
type carPoolsListProps = {
  carPoolsList?: GetCarPoolByCitiesQuery["getCarPoolByCities"];
};
export default function CarpoolList({ carPoolsList }: carPoolsListProps) {
  return (
    <div className="app main-carpool-list">
      {carPoolsList &&
        carPoolsList.map((carPool) => (
          <div key={carPool.id} className="carPoolCard">
            <div className="city-wrapper">
              <div className="carPoolCard-departure">
                <p>Départ : {carPool.departureCity.cityName}</p>
              </div>
              <div className="carPoolCard-arrival">
                <p> Arrivée : {carPool.arrivalCity.cityName}</p>
              </div>
            </div>
            <div className="carPoolCard-time">
              <p> Date {carPool.departureDateTime.split("T")[0]}</p>
              <p className="hour">
                Heure{" "}
                {carPool.departureDateTime
                  .split("T")[1]
                  .split(".")[0]
                  .substr(0, 5)}
              </p>
            </div>
            <div className="carPoolCard-passager">
              <p> Nombre de passager : {carPool.passengerNumber}</p>
            </div>
            {/* <div className="carPoolCard-distance">
              <p> Distance : {carPool.passengerNumber} km</p>
            </div> */}
          </div>
        ))}
    </div>
  );
}
