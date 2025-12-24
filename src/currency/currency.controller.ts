import { Controller, Post, Body, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertDto } from './dto/convert.dto';
import { RateDto } from './dto/rate.dto';

@Controller('api')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post('convert')
  async convert(@Body() dto: ConvertDto) {
    return this.currencyService.convert(dto);
  }

  @Post('rate')
  async rate(@Body() dto: RateDto) {
    return this.currencyService.getRate(dto);
  }

  @Get('currencies')
  async currencies() {
    return this.currencyService.getCurrencies();
  }
  @Get()
  root() {
    return {
      message: 'Currency Converter API is running!',
      endpoints: {
        convert: 'POST /api/convert',
        rate: 'POST /api/rate',
        currencies: 'GET /api/currencies',
      },
      documentation: 'Test with Postman or curl',
    };
  }
  @Get('health')
  health() {
    return {
      status: 'ok',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      service: 'Currency Converter API',
      uptime: process.uptime(),
    };
  }
}
