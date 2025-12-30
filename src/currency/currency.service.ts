import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { ConvertDto } from './dto/convert.dto';
import { RateDto } from './dto/rate.dto';
import { formatTimestamp } from './utils/date.util';

const API_BASE =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1';

interface CurrenciesResponse {
  [code: string]: string; // e.g., { usd: "US Dollar", ngn: "Nigerian Naira" }
}

interface RatesResponse {
  [baseCode: string]: {
    [targetCode: string]: number;
  };
}

@Injectable()
export class CurrencyService {
  private currencies: Record<string, string> = {}; // lowercase code → full name
  private codeMap: Record<string, string> = {}; // normalized input → lowercase code

  private async loadCurrencies(): Promise<void> {
    if (Object.keys(this.currencies).length > 0) {
      return;
    }

    const { data } = await axios.get<CurrenciesResponse>(
      `${API_BASE}/currencies.json`,
    );

    this.currencies = {};
    this.codeMap = {};

    for (const [code, name] of Object.entries(data)) {
      const lowerCode = code.toLowerCase();
      this.currencies[lowerCode] = name;

      // Map direct code and full name
      this.codeMap[lowerCode] = lowerCode;
      this.codeMap[name.toLowerCase()] = lowerCode;

      // Map individual words (e.g., "japanese", "yen", "us", "dollar")
      const words = name.toLowerCase().split(' ');
      for (const word of words) {
        if (word.length >= 2) {
          this.codeMap[word] = lowerCode;
        }
      }

      // Manual overrides for common concatenated or ambiguous inputs
      if (lowerCode === 'usd') {
        this.codeMap['usdollar'] = 'usd';
        this.codeMap['usdollars'] = 'usd';
      }
      if (lowerCode === 'jpy') {
        this.codeMap['japaneseyen'] = 'jpy';
      }
      if (lowerCode === 'eur') {
        this.codeMap['euro'] = 'eur';
      }
      if (lowerCode === 'ngn') {
        this.codeMap['naira'] = 'ngn';
        this.codeMap['nigeriannaira'] = 'ngn';
      }
      if (lowerCode === 'gbp') {
        this.codeMap['pound'] = 'gbp';
      }
    }
  }

  private resolveCurrency(input: string): string | null {
    const lowerInput = input.toLowerCase();

    // Direct match
    if (this.codeMap[lowerInput]) {
      return this.codeMap[lowerInput];
    }

    // Spaces removed (e.g., "japanese yen" → "japaneseyen")
    const noSpace = lowerInput.replace(/ /g, '');
    if (this.codeMap[noSpace]) {
      return this.codeMap[noSpace];
    }

    return null;
  }

  async convert(dto: ConvertDto) {
    await this.loadCurrencies();

    const from = this.resolveCurrency(dto.current_currency);
    const to = this.resolveCurrency(dto.new_currency);

    if (!from || !to) {
      throw new BadRequestException('Invalid currency name or code');
    }

    const { data } = await axios.get<RatesResponse>(
      `${API_BASE}/currencies/${from}.json`,
    );

    const rate = data[from][to];
    const converted = dto.amount * rate;

    return {
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      amount: dto.amount,
      converted_amount: Number(converted.toFixed(6)),
      rate: Number(rate.toFixed(8)),
      timestamp: formatTimestamp(),
    };
  }

  async getRate(dto: RateDto) {
    await this.loadCurrencies();

    const from = this.resolveCurrency(dto.from_currency);
    const to = this.resolveCurrency(dto.to_currency);

    if (!from || !to) {
      throw new BadRequestException('Invalid currency name or code');
    }

    const { data } = await axios.get<RatesResponse>(
      `${API_BASE}/currencies/${from}.json`,
    );

    const rate = data[from][to];

    const fromName = this.currencies[from];
    const toName = this.currencies[to];

    let message: string;
    if (rate >= 1) {
      message = `1 ${fromName} makes ${rate.toFixed(6)} ${toName}`;
    } else {
      const inverseRate = 1 / rate;
      message = `1 ${toName} makes ${inverseRate.toFixed(6)} ${fromName}`;
    }

    return {
      message,
      rate: Number(rate.toFixed(8)),
      base: from.toUpperCase(),
      to: to.toUpperCase(),
      timestamp: formatTimestamp(),
    };
  }

  async getCurrencies() {
    await this.loadCurrencies();

    const currencyList = Object.keys(this.currencies)
      .map((code) => code.toUpperCase())
      .sort();

    return {
      currencies: currencyList,
      total: currencyList.length,
      timestamp: formatTimestamp(),
    };
  }
}
