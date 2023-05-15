import datasource from "./db";
import { CarPool } from "./entity/CarPool";
import User, { encodePassword } from "./entity/User";

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
      departureDate: "20 Avril 2023",
      departureTime: "12h00",
      driverId: 1,
    },
  ]);
  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);
