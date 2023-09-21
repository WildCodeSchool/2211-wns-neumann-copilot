import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import {
  CarPool,
  CarPoolerInput,
  CarPoolerInputUpdate,
  getCarPoolByCitiesInput,
} from "../entity/CarPool";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";

@Resolver()
export default class CarPoolResolver {
  @Query(() => [CarPool])
  async getCarPools(): Promise<CarPool[]> {
    const carPools = await datasource.getRepository(CarPool).find();
    if (carPools === null) throw new Error("carpool not found");
    // console.log(await getDepartureCity("Lille"));
    return carPools;
  }

  @Query(() => CarPool)
  async getCarPool(@Arg("id", () => Int) id: number): Promise<CarPool> {
    const carPool = await datasource
      .getRepository(CarPool)
      .findOne({ where: { id } });
    if (carPool === null)
      throw new ApolloError("Carpool not found", "NOT_FOUND");
    return carPool;
  }

  @Query(() => [CarPool])
  async getCarPoolByCities(
    @Arg("data") data: getCarPoolByCitiesInput
  ): Promise<CarPool[]> {
    const { departureCity, arrivalCity } = data;
    const carPoolByCity = await datasource.getRepository(CarPool).find({
      where: {
        departureCity: { cityName: departureCity },
        arrivalCity: { cityName: arrivalCity },
      },
    });
    if (carPoolByCity === null)
      throw new ApolloError("Carpool not found", "NOT_FOUND");
    return carPoolByCity;
  }

  @Mutation(() => Boolean)
  async deleteCarPool(@Arg("id", () => Int) id: number): Promise<boolean> {
    const deleted = await datasource.getRepository(CarPool).delete(id);
    if (deleted === null)
      throw new ApolloError("Carpool not found", "NOT_FOUND");
    return true;
  }

  @Mutation(() => CarPool)
  async createCarPool(@Arg("data") data: CarPoolerInput): Promise<CarPool> {
    const carPool = datasource.getRepository(CarPool).create();
    return await datasource.getRepository(CarPool).save(carPool);
  }

  @Mutation(() => CarPool)
  async updateCarpool(
    @Arg("userId", () => Int) userId: number,
    @Arg("data") data: CarPoolerInputUpdate
  ): Promise<CarPool> {
    const {
      departureCity,
      arrivalCity,
      departureDateTime,
      passengerNumber,
      id,
    } = data;
    const carpoolToUpdate = await datasource
      .getRepository(CarPool)
      .findOne({ where: { id } });
    if (carpoolToUpdate === null)
      throw new ApolloError("carpool not found", "NOT_FOUND");
    if (carpoolToUpdate.driverId !== userId)
      throw new ApolloError(
        "Only the driver can update the carpool",
        "Unauthorised"
      );
    return await datasource.getRepository(CarPool).save({
      ...carpoolToUpdate,
      departureCity: { id: departureCity },
      arrivalCity: { id: arrivalCity },
      departureDateTime,
      passengerNumber,
    });
  }
}
