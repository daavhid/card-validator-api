import { IsNotEmpty, IsString } from "class-validator";

export class ValidateCardDto {
    @IsNotEmpty()
    @IsString()
    cardNumber:string
}