import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { InputType, ObjectType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";

@ObjectType()
@Entity()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;
}

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

export default User;
