import { CarPool, useGetCarPoolsQuery } from "../gql/generated/schema";

export default function CarpoolList() {
  const { data } = useGetCarPoolsQuery();
  const carPoolsList = data?.getCarPools;
  console.log(carPoolsList);
  return (
    <div>
      (carPoolsList && carPoolsList.map((carPool)
      {
        <div key={carPool.id} className="carPoolCard">
          <div className="carPoolCard-departure">
            <p> Ville de depart : {carPool.departureCity}</p>
          </div>
          <div className="carPoolCard-arrival">
            <p> Ville d'arrivée : {carPool.arrivalCity}</p>
          </div>
          <div className="carPoolCard-time">
            <p> Ville d'arrivée : {carPool.departureDateTime}</p>
          </div>
        </div>
      }
      ) ) COUCOU
    </div>
  );
}
