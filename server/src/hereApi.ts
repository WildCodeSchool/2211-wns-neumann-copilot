import axios from "axios";
import { env } from "./env";

const hereApi = env.HERE_API_KEY;

export interface City {
  cityName: string;
  latitude: number;
  longitude: number;
  zipCode: number;
}

const cities: City[] = [];
export default async function getCities(
  getDepartureCity: string,
  getArrivalCity: string
): Promise<any> {
  try {
    const res = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${getDepartureCity}%2C+France
&lang=fr
&apiKey=${hereApi}`
    );
    const [firstItem] = res.data.items;
    const departureCity: City = {
      cityName: firstItem.title,
      latitude: firstItem.position.lat,
      longitude: firstItem.position.lng,
      zipCode: firstItem.address.postalCode,
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
    const [firstItem] = res.data.items;
    const arrivalCity = {
      cityName: firstItem.title,
      latitude: firstItem.position.lat,
      longitude: firstItem.position.lng,
      zipCode: firstItem.address.postalCode,
    };
    cities.push(arrivalCity);
  } catch (error) {
    console.error("Error", error);
  }
  console.log(cities);

  return cities;
}

export async function getCity(city: string | number): Promise<City> {
  const res = await axios.get(
    `https://geocode.search.hereapi.com/v1/geocode?q=${city}%2C+France
&lang=fr
&apiKey=${hereApi}`
  );
  const [firstItem] = res.data.items;
  const foundCity = {
    cityName: firstItem.title,
    zipCode: firstItem.address.postalCode,
    latitude: firstItem.position.lat,
    longitude: firstItem.position.lng,
  };

  return foundCity;
}
// console.log(getCities("Toulon", "Lille"));
