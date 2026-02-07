import { Body, Controller, Post, Req } from '@nestjs/common';

export type FileInformation = {
    name: string;
    size: number;
    path: string;
    //FIXME : Create an enum maybe with all the audio types ?
    type: string;
}

@Controller('nodes')
export class NodesController {
    @Post('upload')
    createNodes(@Body() files: FileInformation[]) {
        console.log('Ouais ca tape le backend');
        console.log(files);
        return 'YOO la team du front ca dit quoi'
    }
}
