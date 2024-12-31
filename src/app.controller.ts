import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { PublicRoute } from './auth/decorators/publicRoute.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @PublicRoute()
  checkHealth(): string {
    return this.appService.checkHealth();
  }
}
