import axios from "axios";

const hereApi = process.env.HereApiKey;

export interface City {
  title: string;
  position: {
    lat: number;
    lng: number;
  };
}
const cities: City[] = [];
export default async (
  getDepartureCity: string,
  getArrivalCity: string
): Promise<any> => {
  try {
    const res = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${getDepartureCity}%2C+France
&lang=fr
&apiKey=${hereApi}`
    );
    const [returnedArray] = res.data.items;
    const departureCity: City = {
      title: returnedArray.title,
      position: {
        lat: returnedArray.position.lat,
        lng: returnedArray.position.lng,
      },
    };
    cities.push(departureCity);
  } catch (error) {
    console.error("Error", error);
  }

  try {
    const res = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${getArrivalCity}%2C+France
&lang=fr
&apiKey=${hereApi}`
    );
    const [returnedArray] = res.data.items;
    const arrivalCity = {
      title: returnedArray.title,
      position: {
        lat: returnedArray.position.lat,
        lng: returnedArray.position.lng,
      },
    };
    cities.push(arrivalCity);
  } catch (error) {
    console.error("Error", error);
  }
  return cities;
};
