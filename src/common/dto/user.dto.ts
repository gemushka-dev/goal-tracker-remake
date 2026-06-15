import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
export class UserDTO {
  @IsString()
  @IsNotEmpty()
  username!: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsString()
  @IsNotEmpty()
  @Length(8)
  password!: string;
}

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsString()
  @IsNotEmpty()
  @Length(8)
  password!: string;
}
