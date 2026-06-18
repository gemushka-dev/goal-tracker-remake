import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
export class UserDTO {
  @ApiProperty({
    description: "Username",
    example: "CoolBro",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username!: string;
  @ApiProperty({
    description: "Email",
    example: "john.doe@example.com",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @ApiProperty({
    description: "Password",
    example: "Super secret password",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8)
  password!: string;
}

export class UserLoginDTO {
  @ApiProperty({
    description: "Email",
    example: "john.doe@example.com",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @ApiProperty({
    description: "Password",
    example: "Super secret password",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8)
  password!: string;
}
