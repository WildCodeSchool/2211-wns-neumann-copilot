import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { InputType, ObjectType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import { argon2id, hash, verify } from "argon2";

export enum UserRole {
  ADMIN = "admin",
  PASSENGER = "passenger",
  DRIVER = "driver",
}
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

  @Field({ nullable: true })
  @Column({ nullable: true, length: 500, type: "varchar" })
  profilePicture?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 500, type: "varchar" })
  profileDescription?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 50, type: "varchar" })
  pseudo?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 50, type: "varchar" })
  firstName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 50, type: "varchar" })
  lastName?: string;

  @Field()
  @Column({ default: UserRole.PASSENGER, enum: UserRole })
  role: string;
}

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  profileDescription?: string;

  @Field({ nullable: true })
  pseudo?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
const hashageOptions = {
  type: argon2id,
  memoryCost: 2 ** 16,
};
export async function encodePassword(entry: string): Promise<string> {
  return await hash(entry, hashageOptions);
}

export async function verifyPassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return await verify(hashed, plain, hashageOptions);
}

export default User;
