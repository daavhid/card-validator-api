import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CardService {

    checkCardValidity(cardNumber:string){
        //sanitize card number check for spaces, hyphens and other non-digit characters
        
    }

}
