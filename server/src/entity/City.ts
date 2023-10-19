import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CarPool } from "./CarPool";

@Entity()
@ObjectType()
class City {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  cityName: string;

  @Column()
  @Field()
  zipCode: number;

  @Column("real")
  @Field()
  latitude: number;

  @Column("real")
  @Field()
  longitude: number;

  @OneToMany(() => CarPool, (carPool) => carPool.departureCity)
  departureCarpools?: CarPool[];

  @OneToMany(() => CarPool, (carPool) => carPool.arrivalCity)
  arrivalCarpools?: CarPool[];
}

@InputType()
export class CityInput {
  @Field()
  cityName: string;

  @Field()
  zipCode: number;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

export default City;
