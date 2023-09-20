import axios from "axios";
import { env } from "./env";

export interface City {
  title: string;
  position: {
    lat: number;
    lng: number;
  };
}

export default async (getDepartureCity: string): Promise<any> => {
  try {
    const res = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${getDepartureCity}%2C+France
&lang=fr
&apiKey=${env.HereApiKey}`
    );
    const [returnedArray] = res.data.items;
    return {
      title: returnedArray.title,
      position: {
        lat: returnedArray.position.lat,
        lng: returnedArray.position.lng,
      },
    };
  } catch (error) {
    console.error("Error", error);
  }
};
