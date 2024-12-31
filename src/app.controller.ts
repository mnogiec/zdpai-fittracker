import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { PublicRoute } from './auth/decorators/publicRoute.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @PublicRoute()
  @ApiResponse({ status: 200, content: { 'text/plain': { example: 'ok' } } })
  checkHealth(): string {
    return this.appService.checkHealth();
  }
}
