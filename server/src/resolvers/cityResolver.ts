import { Resolver, Query } from "type-graphql";
import City from "../entity/City";
import datasource from "../db";

@Resolver()
export class CityResolver {
  @Query(() => [City])
  async getCities(): Promise<City[]> {
    const Cities = await datasource.getRepository(City).find();
    if (Cities === null) throw new Error("carpool not found");
    return Cities;
  }
}
