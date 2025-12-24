import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/api', 302) // Redirect root to /api
  redirectToApi() {}

  // OR return a message directly:
  // @Get()
  // root() {
  //   return { message: 'Welcome to Currency Converter API. Visit /api for details.' };
  // }
}
