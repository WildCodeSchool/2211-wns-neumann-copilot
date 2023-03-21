import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { InputType, ObjectType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import { argon2id, hash, verify } from "argon2";
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
const hashageOptions = {
  type: argon2id,
  memoryCost: 2 ** 16,
};
export async function encodePassword(entry: string): Promise<string> {
  return await hash(entry, hashageOptions);
}

export async function verifyPassword(   plain: string,   hashed: string ): Promise<boolean> {   return await verify(hashed, plain, hashageOptions); }

export default User;
