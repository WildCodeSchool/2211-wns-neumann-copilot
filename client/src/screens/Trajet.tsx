import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useCreateCarPoolMutation,
  useGetCarPoolByCitiesLazyQuery,
  CarPool,
  GetCarPoolByCitiesQueryResult,
  GetCarPoolByCitiesQuery,
} from "../gql/generated/schema";
import "./css/Trajet.css";
import { FormEvent, useEffect, useState } from "react";
import CarpoolList from "../Components/CarpoolList";
import { log } from "console";

function Trajet() {
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const navigate = useNavigate();
  const [createCarPool] = useCreateCarPoolMutation();
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDateTime, setDepartureDateTime] = useState("");
  const [passengerNumber, setPassengerNumber] = useState(0);
  const [error, setError] = useState("");
  const [driverId, setDriverId] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [GetCarPoolByCities] = useGetCarPoolByCitiesLazyQuery();
  const [carPoolToDisplay, setCarPoolToDisplay] =
    useState<GetCarPoolByCitiesQuery["getCarPoolByCities"]>();
  const passengerId = 0;

  useEffect(() => {
    if (currentUser) {
      setDriverId(currentUser.profile.id);
    }
  }, [currentUser]);

  function handleToggle() {
    setToggle(!toggle);
  }
  async function createNewCarpool(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await createCarPool({
        variables: {
          data: {
            departureCityname: departureCity,
            arrivalCityname: arrivalCity,
            departureDateTime,
            passengerNumber,
            driverId,
            passengerId,
          },
        },
      });
    } catch (err) {
      console.error(error);
      setError("invalid credentials");
    } finally {
      client.resetStore();
      navigate("/trajet");
    }
  }

  async function carPoolbycities(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await GetCarPoolByCities({
        variables: {
          data: {
            arrivalCity,
            departureCity,
          },
        },
      });
      console.log(res.data?.getCarPoolByCities);

      setCarPoolToDisplay(res.data?.getCarPoolByCities);
    } catch (err) {
      console.error(err);
      setError("invalid City");
    }
  }
  return (
    <div className="trajet">
      <div className="app">
        <form
          className="form_create_carpool"
          onSubmit={(e: FormEvent) => {
            toggle ? carPoolbycities(e) : createNewCarpool(e);
          }}
        >
          {/* Ville de Départ */}
          <div className="input">
            <input
              type="text"
              placeholder="Ville de départ"
              name=""
              onChange={(e) => setDepartureCity(e.target.value)}
              value={departureCity}
              required
            />
          </div>
          {/* Ville d'arrivée */}
          <div className="input">
            <input
              type="text"
              placeholder="Ville d'arrivée"
              name=""
              onChange={(e) => setArrivalCity(e.target.value)}
              value={arrivalCity}
              required
            />
          </div>
          {/* Jour et heure du départ */}
          <div className="input">
            <input
              type="datetime-local"
              onChange={(e) => setDepartureDateTime(e.target.value)}
              value={departureDateTime}
              required
            />
          </div>
          {/* Nombre de passager */}
          <div className="input">
            <input
              type="number"
              placeholder="Nombre de passager"
              onChange={(e) => {
                parseInt(e.target.value) > 0
                  ? setPassengerNumber(parseInt(e.target.value))
                  : setPassengerNumber(0);
              }}
              value={passengerNumber}
              required
            />
          </div>

          <div className="toggle">
            <p>je propose</p>
            <label className="switch">
              <input type="checkbox" id="toggle" onChange={handleToggle} />
              <span className="slider round"></span>
            </label>
            <p>je recherche</p>
          </div>

          <button type="submit" className="button">
            Valider
          </button>
        </form>
        {toggle && <CarpoolList carPoolsList={carPoolToDisplay} />}
      </div>
    </div>
  );
}
export default Trajet;
