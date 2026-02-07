import { Body, Controller, Post, Req } from '@nestjs/common';
import { NodesService } from "./nodes.service";

export type FileInformation = {
    name: string;
    size: number;
    path: string;
    //FIXME : Create an enum maybe with all the audio types ?
    type: string;
}

@Controller('nodes')
export class NodesController {
    constructor(private readonly nodesService: NodesService) {}
    @Post('upload')
    async createNodes(@Body() files: FileInformation[]) {
        console.log(files);
        return this.nodesService.upsertFilesIntoNodes(files);
    }
}
