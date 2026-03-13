import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { exec } from 'child_process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/health")
  healthCheck(){
    return {status: "ok"}
  }

  // VULNERABLE ENDPOINT: OS Command Injection
  @Get("/ping")
  pingHost(@Query('host') host: string, @Query('callback') callback: any) {
    // Passes user input directly to the shell
    exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
      console.log(stdout);
    });
    return { message: "Ping started!" };
  }
}
