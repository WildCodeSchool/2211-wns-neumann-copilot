import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { InputType, ObjectType, Field } from "type-graphql";
import { IsInt, MinLength } from "class-validator";

@ObjectType()
@Entity()
export class CarPool {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  departureCity: string;

  @Field()
  @Column()
  arrivalCity: string;

  @Field()
  @Column()
  departureDateTime: string;

  @Field()
  @Column()
  passengerNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  passengerId?: string;

  @Field()
  @Column()
  driverId: number;
}

@InputType()
export class CarPoolerInput {
  @Column()
  id: number;

  @Field()
  @MinLength(1)
  departureCity: string;

  @Field()
  @MinLength(1)
  arrivalCity: string;

  @Field()
  @MinLength(1)
  departureDateTime: string;

  @Field()
  @MinLength(1)
  passengerNumber: string;

  @Field()
  passengerId?: string;

  @Field()
  @IsInt()
  driverId: number;
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
