import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('latest')
  getLatestRates(
    @Query('base') base: string = 'USD',
    @Query('currencies') currencies: string = '',
  ) {
    const currenciesArray = currencies ? currencies.split(',') : [];
    return this.currencyService.getLatestRates(base, currenciesArray);
  }

  @Get('convert')
  convertCurrency(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: number,
  ) {
    return this.currencyService.convertCurrency(from, to, amount);
  }
}