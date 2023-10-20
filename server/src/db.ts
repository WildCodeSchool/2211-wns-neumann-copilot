import { DataSource } from "typeorm";
import { env } from "./env";
import City from "./entity/City";
import { CarPool } from "./entity/CarPool";
import User from "./entity/User";

const datasource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  entities: [City, CarPool, User],
  logging: ["query", "error"],
});

export default datasource;
