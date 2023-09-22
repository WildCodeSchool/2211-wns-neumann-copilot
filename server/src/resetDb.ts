import datasource from "./db";
import { CarPool } from "./entity/CarPool";
import City from "./entity/City";
import User, { encodePassword } from "./entity/User";

async function reset(): Promise<void> {
  await datasource.initialize();
  await datasource.getRepository(City).delete({});
  const BasicCities = await datasource.getRepository(City).save([
    {
      cityName: "Lille",
      latitude: "50.629250",
      longitude: "3.057256",
      zipCode: "59000",
    },
    {
      cityName: "Lyon",
      latitude: "45.75917",
      longitude: "4.82965",
      zipCode: "69000",
    },
  ]);
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
      departureCity: BasicCities[0],
      arrivalCity: BasicCities[1],
      departureDateTime: "2023-05-19T16:30",
      driverId: 1,
      passengerNumber: 3,
    },
  ]);
  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);
