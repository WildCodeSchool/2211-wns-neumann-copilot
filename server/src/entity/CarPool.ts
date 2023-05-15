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

  @Field({ nullable: true })
  @Column({ nullable: true })
  departureDate: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  departureTime: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  passengerId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
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
  departureDate: string;

  @Field()
  @MinLength(1)
  departureTime: string;

  @Field()
  passengerId?: string;

  @Field()
  @IsInt()
  driverId: number;
}
