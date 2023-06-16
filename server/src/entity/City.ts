import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class City {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  cityName: string;

  @Field()
  @Column()
  zipCode: string;

  @Field()
  @Column({ type: "float" })
  latitude: number;

  @Field()
  @Column({ type: "float" })
  longitude: number;
}
@InputType()
export class cityInput {
  @Field()
  cityName: string;

  @Field()
  zipCode: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}
