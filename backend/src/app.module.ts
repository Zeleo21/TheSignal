import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodesController } from './node/nodes.controller';
import { NodesService } from "./node/nodes.service";
import { NodeComputeService } from './node/node-compute/node-compute.service';

@Module({
  imports: [],
  controllers: [AppController, NodesController],
  providers: [AppService, NodesService, NodeComputeService],
})
export class AppModule {}
