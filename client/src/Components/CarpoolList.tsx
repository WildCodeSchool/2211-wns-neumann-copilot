import { CarPool } from "../gql/generated/schema";
type carPoolsListProps = {
  carPoolsList?: CarPool[];
};
export default function CarpoolList({ carPoolsList }: carPoolsListProps) {
  console.log("LALALALAL");

  return (
    <div>
      {carPoolsList &&
        carPoolsList.map((carPool: CarPool) => (
          <div key={carPool.id} className="carPoolCard">
            <div className="carPoolCard-departure">
              <p> Ville de depart : {carPool.departureCity}</p>
            </div>
            <div className="carPoolCard-arrival">
              <p> Ville d'arrivée : {carPool.arrivalCity}</p>
            </div>
            <div className="carPoolCard-time">
              <p> heure de depart : {carPool.departureDateTime}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
