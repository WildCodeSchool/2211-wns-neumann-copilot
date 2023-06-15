import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useCreateCarPoolMutation,
  useGetCarPoolByCitiesLazyQuery,
  CarPool,
} from "../gql/generated/schema";
import "./css/Trajet.css";
import { FormEvent, useEffect, useState } from "react";
import CarpoolList from "../Components/CarpoolList";

function Trajet() {
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const navigate = useNavigate();
  const [createCarPool] = useCreateCarPoolMutation();
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDateTime, setDepartureDateTime] = useState("");
  const [passengerNumber, setPassengerNumber] = useState("");
  const [error, setError] = useState("");
  const [driverId, setDriverId] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [GetCarPoolByCities] = useGetCarPoolByCitiesLazyQuery();
  const [carPoolToDisplay, setCarPoolToDisplay] = useState<CarPool[]>();
  const passengerId = "";

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
            departureCity,
            arrivalCity,
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
            />
          </div>
          {/* Jour et heure du départ */}
          <div className="input">
            <input
              type="datetime-local"
              onChange={(e) => setDepartureDateTime(e.target.value)}
              value={departureDateTime}
            />
          </div>
          {/* Nombre de passager */}
          <div className="input">
            <input
              type="text"
              placeholder="Nombre de passager"
              name=""
              onChange={(e) => setPassengerNumber(e.target.value)}
              value={passengerNumber}
            />
          </div>

          <div className="toggle">
            <p>je recherche</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <p>je propose</p>
          </div>

          <div className="toggle">
            <p>je propose</p>
            <label className="switch">
              <input type="checkbox" id="toggle" onChange={handleToggle} />
              <span className="slider round"></span>
            </label>
            <p>je recherche</p>
          </div>
          {toggle && <CarpoolList carPoolsList={carPoolToDisplay} />}
          <button type="submit" className="button">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}
export default Trajet;
