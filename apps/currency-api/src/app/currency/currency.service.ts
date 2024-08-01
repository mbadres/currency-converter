import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { config } from '../config/config';

@Injectable()
export class CurrencyService {
  private readonly apiUrl = 'https://api.freecurrencyapi.com/v1';

  constructor(private readonly httpService: HttpService) {}

  async getLatestRates(base: string = 'USD', currencies: string[] = []): Promise<any> {
    try {
      const params = new URLSearchParams({
        apikey: config.freeCurrencyApiKey,
        base_currency: base,
      });

      if (currencies.length > 0) {
        params.append('currencies', currencies.join(','));
      }

      const response = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/latest`, { params })
      );

      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch currency rates', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async convertCurrency(from: string, to: string, amount: number): Promise<any> {
    try {
      const params = new URLSearchParams({
        apikey: config.freeCurrencyApiKey,
        from,
        to,
        amount: amount.toString(),
      });

      const response = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/convert`, { params })
      );

      return response.data;
    } catch (error) {
      throw new HttpException('Failed to convert currency', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}