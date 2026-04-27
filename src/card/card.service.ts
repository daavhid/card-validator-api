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

}
