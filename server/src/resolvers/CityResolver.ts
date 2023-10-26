import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import City, { CityInput } from "../entity/City";
import datasource from "../db";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getCities(): Promise<City[]> {
    const cities = await datasource.getRepository(City).find();
    if (cities === null) throw new Error("no cities in the db");
    return cities;
  }

  @Query(() => City)
  async getCity(@Arg("id", () => Int) id: number): Promise<City> {
    const city = await datasource
      .getRepository(City)
      .findOne({ where: { id } });
    if (city === null) throw new Error("City not Found");
    console.log("no city found");
    return city;
  }

  @Mutation(() => City)
  async createCity(@Arg("data") data: CityInput): Promise<City> {
    const city = datasource.getRepository(City).create();
    return await datasource.getRepository(City).save(city);
  }
}
