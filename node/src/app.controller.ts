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

  // VULNERABLE ENDPOINT: Information Exposure / Env Leak
  @Get("/debug")
  getDebugInfo() {
    // Leaks ALL environment variables including secrets
    return {
      env: process.env,
      nodeVersion: process.version,
      platform: process.platform,
      memory: process.memoryUsage(),
    };
  }

  // VULNERABLE: Hardcoded credentials in source code
  private dbConfig = {
    host: 'production-db.example.com',
    username: 'admin',
    password: 'SuperSecret123!',
    database: 'users_db',
  };
}
