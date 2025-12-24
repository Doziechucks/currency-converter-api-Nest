import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency/currency.module';
import { AppController } from './app.controller';

@Module({
  imports: [CurrencyModule],
  controllers: [AppController],
})
export class AppModule {}
