import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  healthCheck() {
    return { status: 'ok' };
  }

  // VULNERABLE ENDPOINT: OS Command Injection
  // @Get('/ping')
  // pingHost(@Query('host') host: string) {
  //   // Passes user input directly to the shell
  //   exec(`ping -c 4 ${host}`, (error, stdout) => {
  //     console.log(stdout);
  //   });
  //   return { message: 'Ping started!' };
  // }

  // VULNERABLE ENDPOINT: Information Exposure / Env Leak
  @Get('/debug')
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
    password: process.env.DB_PASSWORD,
    database: 'users_db',
  };

  // VULNERABLE: Hardcoded AWS and GitHub credentials to test gitleaks
  //   private awsConfig = {
  //     accessKeyId: 'REMOVED_AWS_KEY',
  //     secretAccessKey: 'REMOVED_AWS_SECRET'
  //   };
  //   private githubToken = 'REMOVED_GITHUB_TOKEN';
}
