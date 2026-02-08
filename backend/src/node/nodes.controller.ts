import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req} from '@nestjs/common';
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
    @Get('/tree/:rootId')
    async getAllNodeTreeFromRootId(@Param('rootId') rootId: string) {
        if (!rootId) throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'You must provide a root id',
        }, HttpStatus.BAD_REQUEST);
        return this.nodesService.getAllFilesAndDirectoriesFromRootNode(rootId);
    }
}
