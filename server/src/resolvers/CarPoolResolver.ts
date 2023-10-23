import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import {
  CarPool,
  CarPoolerInput,
  // CarPoolerInputUpdate,
  getCarPoolByCitiesInput,
} from "../entity/CarPool";
import { ContextType } from "..";
import City from "../entity/City";
import { getCity } from "../hereApi";

@Resolver()
export default class CarPoolResolver {
  @Query(() => [CarPool])
  async getCarPools(): Promise<CarPool[]> {
    const carPools = await datasource
      .getRepository(CarPool)
      .find({ relations: ["departureCity", "arrivalCity"] });
    if (carPools === null) throw new Error("carpool not found");
    return carPools;
  }

  @Query(() => CarPool)
  async getCarPool(@Arg("id", () => Int) id: number): Promise<CarPool> {
    const carPool = await datasource
      .getRepository(CarPool)
      .findOne({ relations: ["departureCity", "arrivalCity"], where: { id } });
    if (carPool === null)
      throw new ApolloError("Carpool not found", "NOT_FOUND");
    return carPool;
  }

  // @Query(() => [CarPool])
  // async getCarPoolByCities(
  //   @Arg("data") data: getCarPoolByCitiesInput
  // ): Promise<CarPool[]> {
  //   const {
  //     departureCity,
  //     arrivalCity,
  //     // departureDateTime
  //   } = data;
  //   const carPoolByCity = await datasource.getRepository(CarPool).find({
  //     relations: ["departureCity", "arrivalCity"],
  //     where: {
  //       departureCity: { cityName: departureCity.toLowerCase() },
  //       arrivalCity: { cityName: arrivalCity.toLowerCase() },
  //       // departureDateTime: {departureDateTime : }
  //     },
  //   });
  //   if (carPoolByCity === null)
  //     throw new ApolloError("Carpool not found", "NOT_FOUND");
  //   return carPoolByCity;
  // }
  @Query(() => [CarPool])
  async getCarPoolByCities(
    @Arg("data") data: getCarPoolByCitiesInput
  ): Promise<CarPool[]> {
    const { departureCity, arrivalCity } = data;
    const carPoolByCities = await datasource
      .getRepository(CarPool)
      .createQueryBuilder("carPool")
      .innerJoinAndSelect("carPool.departureCity", "departureCity")
      .addSelect(["departureCity.latitude", "departureCity.longitude"])
      .where("departureCity.cityName =:departureCity", { departureCity })
      .innerJoinAndSelect("carPool.arrivalCity", "arrivalCity")
      .addSelect(["arrivalCity.latitude", "arrivalCity.longitude"])
      .where("arrivalCity.cityName=:arrivalCity", { arrivalCity })
      .getMany();
    const radiusInMeter=10000;
    consr departureCityPoint=`POINT(${carPoolByCities.})`
    const carPoolNearBy = await datasource;

    // const carPoolNearBy = await datasource.getRepository(CarPool).find({});
    if (carPoolByCities === null)
      throw new ApolloError("Carpool not found", "NOT_FOUND");
    return carPoolByCities;
  }

  @Mutation(() => Boolean)
  async deleteCarPool(@Arg("id", () => Int) id: number): Promise<boolean> {
    const deleted = await datasource.getRepository(CarPool).delete(id);
    if (deleted === null)
      throw new ApolloError("Carpool not found", "NOT_FOUND");
    return true;
  }

  @Authorized()
  @Mutation(() => CarPool)
  async createCarPool(
    @Arg("data") data: CarPoolerInput,
    @Ctx() { currentUser }: ContextType
  ): Promise<CarPool> {
    if (typeof currentUser !== "object") {
      throw new ApolloError("Vous devez être connecté !!!");
    }

    // 1ere etapes est ce que ma ville existe en base
    let departureCity = await datasource
      .getRepository(City)
      .findOne({ where: { cityName: data.departureCityname.toLowerCase() } });
    // Non elle n existe pas Infos depuis l api+ ajout en base
    if (departureCity === null) {
      const departureCityApi = await getCity(data.departureCityname);
      departureCityApi.cityName = departureCityApi.cityName
        .split(",")[0]
        .toLowerCase();
      departureCity = await datasource
        .getRepository(City)
        .save(departureCityApi);
    }

    // 1ere etapes est ce que ma ville existe en base
    let arrivalCity = await datasource
      .getRepository(City)
      .findOne({ where: { cityName: data.arrivalCityname.toLowerCase() } });
    // Non elle n existe pas Infos depuis l api+ ajout en base
    if (arrivalCity === null) {
      const arrivalApi = await getCity(data.arrivalCityname);
      arrivalApi.cityName = arrivalApi.cityName.split(",")[0].toLowerCase();
      arrivalCity = await datasource.getRepository(City).save(arrivalApi);
    }
    // Oui elle existe : je recupere son id

    // Je creer mon car pool
    return await datasource.getRepository(CarPool).save({
      driverId: currentUser.id,
      departureCity,
      arrivalCity,
      passengerNumber: data.passengerNumber,
      departureDateTime: new Date(data.departureDateTime),
    });
  }

  // @Mutation(() => CarPool)
  // async updateCarpool(
  //   @Arg("userId", () => Int) userId: number,
  //   @Arg("data") data: CarPoolerInputUpdate
  // ): Promise<CarPool> {
  //   const {
  //     departureCity,
  //     arrivalCity,
  //     departureDateTime,
  //     passengerNumber,
  //     id,
  //   } = data;
  //   const carpoolToUpdate = await datasource
  //     .getRepository(CarPool)
  //     .findOne({ where: { id } });
  //   if (carpoolToUpdate === null)
  //     throw new ApolloError("carpool not found", "NOT_FOUND");
  //   if (carpoolToUpdate.driverId !== userId)
  //     throw new ApolloError(
  //       "Only the driver can update the carpool",
  //       "Unauthorised"
  //     );
  //   return await datasource.getRepository(CarPool).save({
  //     ...carpoolToUpdate,
  //     departureCity: { id: departureCity },
  //     arrivalCity: { id: arrivalCity },
  //     departureDateTime,
  //     passengerNumber,
  //   });
  // }
}
