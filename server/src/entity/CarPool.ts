import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { InputType, ObjectType, Field } from "type-graphql";
import { IsInt, MinLength } from "class-validator";
import City from "./City";

@ObjectType()
@Entity()
export class CarPool {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => City)
  @ManyToOne(() => City, (departureCity) => departureCity.departureCarpools)
  departureCity: City;

  @Field(() => City)
  @ManyToOne(() => City, (arrivalCity) => arrivalCity.arrivalCarpools)
  arrivalCity: City;

  @Field()
  @Column({ type: "timestamptz" })
  departureDateTime: Date;

  @Field()
  @Column()
  passengerNumber: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  passengerId?: number;

  @Field()
  @Column()
  driverId: number;
}

@InputType()
export class CarPoolerInput {
  @Field()
  @MinLength(1)
  departureCityname: string;

  @Field()
  @MinLength(1)
  arrivalCityname: string;

  @Field()
  departureDateTime: Date;

  @Field()
  passengerNumber: number;

  @Field({ nullable: true })
  passengerId?: number;

  @Field()
  @IsInt()
  driverId: number;
}
@InputType()
export class CarPoolerInputUpdate extends CarPoolerInput {
  @Field()
  id: number;
}

@InputType()
export class getCarPoolByCitiesInput {
  @Field()
  @MinLength(1)
  departureCity: string;

  @Field()
  @MinLength(1)
  arrivalCity: string;
}

@InputType()
export class getNearbyCarpool {
  @Field()
  departureCityName: string;

  @Field()
  arrivalCityName: string;
}
