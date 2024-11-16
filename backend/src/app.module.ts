import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from 'config/configuration';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestResponseInterceptor } from './interceptors/request.response.interceptor';
import { HtmlMiddleware } from './middlewares/html.middleware';
import { NoCacheMiddleware } from './middlewares/no-cache.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../src/modules/User/user-module';
import { JsonResponseMiddleware } from './middlewares/json.response.middleware';

//INTERCEPTOR_CHANGES
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/development.env`,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    UsersModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../','client'),
    //   exclude: ['/api/(.*)'
    //   ]
    // })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  //MIDDLEWARE_CHANGES
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JsonResponseMiddleware,HtmlMiddleware, LoggingMiddleware)
       .forRoutes('*');
  }
}
