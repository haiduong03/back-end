import { Controller, Post } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';

@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) { }

  // @Post()
  // async retry() {
  //   this.loyaltyService.handleRetryLoyalty();
  //   return "ok"
  // }
}
