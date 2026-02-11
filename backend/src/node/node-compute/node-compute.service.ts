import {Injectable} from '@nestjs/common';
import {FileEnum} from "../../constants/fileEnum";
import {FileInformation} from "../nodes.controller";
import {AudioFormat, CodeFormat, FileFormat, fileFormatToWeightMap} from "./constant";

@Injectable()
export class NodeComputeService {


    //FIXME : use a map later on for clean code
    mapFileExtension(extension: string): FileFormat {
        if (extension === "audio/flac") {
            return AudioFormat.FLAC;
        } else if (extension === "text/html") {
            return CodeFormat.HTML;
        }
        throw new Error('Unsupported extension, please add it to the list');
    }

    //FIXME : what do i compute ? lol
    computeNodeFileFrequencyVector(file: FileInformation, type: FileEnum): number[] {
        if(type === FileEnum.DIRECTORY) return [];
        const extension = this.mapFileExtension(file.type);
        const extensionWeigth = fileFormatToWeightMap[extension];
        return [extensionWeigth, 0, 0];
    }
}
