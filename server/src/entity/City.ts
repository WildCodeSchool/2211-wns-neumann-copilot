import { Field, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CarPool } from "./CarPool";

export interface Geometry {
  type: "Point";
  coordinates: [Number, Number];
}

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

  @Column("geometry", {
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true,
  })
  @Index({ spatial: true })
  coordinates?: Geometry;

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
