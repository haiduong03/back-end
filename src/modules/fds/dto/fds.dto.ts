import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginFdsDto {
    @ApiProperty()
    @IsString()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class TokenFdsDto {
    @ApiProperty()
    @IsString()
    @IsString()
    @IsNotEmpty()
    access_token: string;
}