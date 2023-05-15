import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { CarPool, CarPoolerInput } from "../entity/CarPool";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
@Resolver()
export class CarPoolResolver {
  @Query(() => [CarPool])
  async getCarPools(): Promise<CarPool[]> {
    const carPools = await datasource.getRepository(CarPool).find();
    if (carPools === null) throw new Error("carpool not found");
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

  @Mutation(() => Boolean)
  async deleteCarPool(@Arg("id", () => Int) id: number): Promise<boolean> {
    const deleted = await datasource.getRepository(CarPool).delete(id);
    if (deleted === null)
      throw new ApolloError("Carpool not found", "NOT_FOUND");
    return true;
  }

  @Mutation(() => CarPool)
  async createCarPool(@Arg("data") data: CarPoolerInput): Promise<CarPool> {
    return await datasource.getRepository(CarPool).save(data);
  }

  @Mutation(() => CarPool)
  async updateCarpool(
    @Arg("userId", () => Int) userId: number,
    @Arg("carPoolId", () => Int) carPoolId: number,
    @Arg("data") data: CarPoolerInput
  ): Promise<CarPool> {
    const id = carPoolId;
    const { departureCity, arrivalCity, departureDate, departureTime } = data;
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
    return await datasource
      .getRepository(CarPool)
      .save({ id, departureCity, arrivalCity, departureDate, departureTime });
  }
}
