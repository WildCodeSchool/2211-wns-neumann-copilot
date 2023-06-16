import datasource from "./db";
import { CarPool } from "./entity/CarPool";
import User, { encodePassword } from "./entity/User";
import fs from "fs";
import City from "./entity/City";
interface IncomingData {
  datasetid?: string;
  recordid?: string;
  fields: {
    code_postal: string;
    libelle_d_acheminement: string;
    code_commune_insee: string;
    ligne_5?: string;
    coordonnees_geographiques: number[];
    nom_de_la_commune: string;
  };
  geometrie?: {
    type: string;
    coordinates: [number];
    record_timestamp: string;
  };
}

async function reset(): Promise<void> {
  await datasource.initialize();
  await datasource.getRepository(User).delete({});
  await datasource.getRepository(User).save([
    {
      email: "userReset@hello.com",
      hashedPassword: await encodePassword("password123"),
      pseudo: "TOTO",
      role: "admin",
    },
    {
      email: "jackieA5@autoplus.vroom",
      hashedPassword: await encodePassword("a5a5a5a5a5"),
      pseudo: "Satanas",
      role: "passenger",
    },
  ]);
  await datasource.getRepository(CarPool).delete({});
  await datasource.getRepository(CarPool).save([
    {
      departureCity: "Dunkerque",
      arrivalCity: "Lille",
      departureDateTime: "2023-05-19T16:30",
      driverId: 1,
      passengerNumber: "1",
    },
  ]);
  await datasource.getRepository(City).delete({});
  const jsonData: string = fs.readFileSync(
    "asset/laposte_hexasmal.json",
    "utf8"
  );
  const localData: IncomingData[] = JSON.parse(jsonData);
  const dataToPush: Array<Partial<City>> = localData.map((city) => {
    return {
      cityName: city.fields.nom_de_la_commune,
      zipCode: city.fields.code_postal,
      latitude: city.fields.coordonnees_geographiques[0],
      longitude: city.fields.coordonnees_geographiques[1],
    };
  });

  await datasource.getRepository(City).save(dataToPush);

  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);
