import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodesController } from './node/nodes.controller';
import { NodesService } from "./node/nodes.service";

@Module({
  imports: [],
  controllers: [AppController, NodesController],
  providers: [AppService, NodesService],
})
export class AppModule {}
