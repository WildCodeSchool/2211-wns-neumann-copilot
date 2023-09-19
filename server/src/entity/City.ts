import { Field, ObjectType } from "type-graphql";
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
  zipCode: string;

  @Column()
  @Field()
  latitude: string;

  @Column()
  @Field()
  longitude: string;

  @OneToMany(() => CarPool, (carPool) => carPool.departureCity)
  departureCarpools?: CarPool[];

  @OneToMany(() => CarPool, (carPool) => carPool.arrivalCity)
  arrivalCarpools?: CarPool[];
}
export class CityInput {
  @Field()
  cityName: string;

  @Field()
  zipCode: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;
}
export default City;
