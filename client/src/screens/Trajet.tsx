import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useCreateCarPoolMutation,
  CarPoolerInput,
} from "../gql/generated/schema";
import "./css/Trajet.css";
import { useEffect, useState } from "react";
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
  const passengerId = "";

  useEffect(() => {
    if (currentUser) {
      setDriverId(currentUser.profile.id);
    }
  }, [currentUser]);
  // console.log(toggle);
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <div className="trajet">
      <div className="app">
        <div className="toggle">
          <p>je propose</p>
          <label className="switch">
            <input type="checkbox" id="toggle" onChange={handleToggle} />
            <span className="slider round"></span>
          </label>
          <p>je recherche</p>
        </div>
        {toggle ? (
          <CarpoolList />
        ) : (
          <form
            className="form_create_carpool"
            onSubmit={async (e) => {
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
                console.error(err);
                setError("invalid credentials");
              } finally {
                client.resetStore();
                navigate("/trajet");
              }
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
                placeholder=""
                name=""
                onChange={(e) => setDepartureDateTime(e.target.value)}
                value={departureDateTime}
              />
            </div>
            {/* Nombre de passager */}
            <div className="input_carpool">
              <input
                type="text"
                placeholder="Nombre de passager"
                name=""
                onChange={(e) => setPassengerNumber(e.target.value)}
                value={passengerNumber}
              />
            </div>
            <input
              type="submit"
              className="button button_validate"
              value="Valider"
            />
          </form>
        )}
      </div>
    </div>
  );
}
export default Trajet;
