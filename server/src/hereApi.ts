import axios from "axios";
import { env } from "./env";

export interface City {
  title: string;
  position: {
    lat: number;
    lng: number;
  };
}
export default class retrieveGeopoint {
  getDepartureCity = async (departurePoint: string): Promise<any> => {
    try {
      const res = await axios.get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${departurePoint}%2C+France
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
}
// axios
//   .get(
//     `https://geocode.search.hereapi.com/v1/geocode?q=5+Rue+Daunou%2C+75000+Paris%2C+France
// &lang=fr
// &apiKey=${env.HereApiKey}`
//   )
//   .then((res) => {
//     const returnedArray = res.data.items;
//     returnedArray.map((item: City) => {
//       const arrivalCity: City = {
//         title: item.title,
//         position: {
//           lat: item.position.lat,
//           lng: item.position.lng,
//         },
//       };
//       return console.log(arrivalCity);
//     });
//   })
//   .catch((error) => {
//     console.error("Error", error);
//   });
