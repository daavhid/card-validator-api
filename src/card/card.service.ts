import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CardService {

    checkCardValidity(cardNumber:string){
        //sanitize card number check for spaces, hyphens and other non-digit characters
        
    }

    private sanitizeCardNumber(cardNumber:string):string{
        const cleaned = cardNumber.trim().replace(/[\s-]/g,'');
        const isAllDigits = /^\d+$/.test(cleaned);
        if (!isAllDigits){
            throw new BadRequestException('Card number must contain only digits');
        }
        return cleaned;
    }

    private luhnCheck(cardNumber:string):boolean{
        let sum = 0;
        const ArrNumber = Array.from(cardNumber).reverse();
        for(let i = 0; i < ArrNumber.length;i++){
            let digit = parseInt(ArrNumber[i]);
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
