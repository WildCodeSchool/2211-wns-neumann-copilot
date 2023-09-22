import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
} from "typeorm";
import { InputType, ObjectType, Field, ID } from "type-graphql";
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
  @Field(() => ID)
  @MinLength(1)
  departureCity: number;

  @Field(() => ID)
  @MinLength(1)
  arrivalCity: number;

  @Field()
  @MinLength(1)
  departureDateTime: string;

  @Field()
  @MinLength(1)
  passengerNumber: number;

  @Field()
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
