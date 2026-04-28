import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { AppController } from './app.controller';

@Module({
  imports: [CardModule],
  controllers: [AppController],
})
export class AppModule {}
