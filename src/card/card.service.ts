import { BadRequestException, Injectable } from '@nestjs/common';
import { validatedCardResp } from './dto/validated-card-response.dto';

@Injectable()
export class CardService {

    validateCardNumber(cardNumber:string): validatedCardResp{
        //sanitize card number check for spaces, hyphens and other non-digit characters
        const sanitizedCardNumber = this.sanitizeCardNumber(cardNumber);

        //check if the card number is valid using Luhn algorithm
        const isCardValid = this.luhnCheck(sanitizedCardNumber);

        if(!isCardValid){
            throw new BadRequestException({
                code:"CARD_INVALID",
                valid:false,
                message: "card number checksum failed"
            })
        }

        return {
            valid: true,
            code:"CARD_VALID",
            message:"valid card number"
        }
    }

    private sanitizeCardNumber(cardNumber:string):string{
        const cleaned = cardNumber.trim().replace(/[\s-]/g,'');
        
        // check if the length of the string is the required length for a card number 
        if (cleaned.length < 13 || cleaned.length > 19) {
            throw new BadRequestException({
                code: "INVALID_CARD_LENGTH",
                valid:false,
                message: "Card number must be between 13 and 19 digits"
            });
        }


        //run regex test to check if all characters in the string are all digits
        const isAllDigits = /^\d+$/.test(cleaned);
        if (!isAllDigits){
            throw new BadRequestException({
                code:"INVALID_CARD_NUMBER",
                valid:false,
                message:'Card number must contain only digits'
            });
        }

        return cleaned;
    }

    private luhnCheck(cardNumber:string):boolean{
        let sum = 0;
        const ArrNumber = Array.from(cardNumber).reverse();
        for(let i = 0; i < ArrNumber.length;i++){
            const digit = Number(ArrNumber[i]);
            if(i % 2 === 1){
                let double = digit * 2;
                if(double > 9){
                    double -=9;
                }
                sum += double;
                
            }else{

                sum += digit;
            }
        }

        return sum % 10 === 0;
    }

}
