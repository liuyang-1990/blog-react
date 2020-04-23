import { Controller, Scope, Get, Render } from '@nestjs/common';

@Controller({ scope: Scope.REQUEST })
export class AppController {
  constructor() { }

  @Get()
  @Render('index')
  getHello() {
    const user = { name: 'NestJS' };
    return { title: "NestJS" };
  }
}
