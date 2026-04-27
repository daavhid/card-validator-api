import { Body, Controller, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { ValidateCardDto } from './dto/validate-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}
  @Post('validate')
  checkCardValidity(@Body() card:ValidateCardDto ){
    return this.cardService.checkCardValidity(card.cardNumber);
  }
}
