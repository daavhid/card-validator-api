import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { BadRequestException } from '@nestjs/common';

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardService],
    }).compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateCardNumber',()=>{
    it("should validate a correct card number", () => {
      const result = service.validateCardNumber('4242 4242-4242-4242')

      expect(result).toEqual({
            valid: true,
            code:"CARD_VALID",
            message:"valid card number"
        })
    })

    it("should throw an error for invalid card number", () => { 
      expect(()=>{
        service.validateCardNumber('1234567890123456')
      }).toThrow(BadRequestException)
    })

    it("should throw an error for non-digit characters",()=>{
      expect(()=>{
        service.validateCardNumber('1234567890123456')
      }).toThrow(BadRequestException)
    })

    it("should throw an error for invalid lengths",()=>{
      expect(()=>{
        service.validateCardNumber('123 456 789')
      }).toThrow(BadRequestException)
    })
  })
});
