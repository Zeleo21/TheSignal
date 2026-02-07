import { Injectable } from '@nestjs/common';
import { FileInformation } from "./nodes.controller";
import { FileEnum } from "../constants/fileEnum";
import prisma from "../prisma/client";
import { Prisma, Node } from '@prisma/client';

@Injectable()
export class NodesService {

    parsePath(path: string): string[] {
        if(!path) return [];
        return path.split("/");
    }

    transformFileToNode(file: FileInformation, parentId: string | null): Prisma.NodeUncheckedCreateInput {
        return {
            parentId: parentId,
            name: file.name,
            type: FileEnum.FILE,
            createdAt: new Date(Date.now()),
            metadata: {},
            //FIXME: fix this when we compute the data for it.
            //FIXME: fix this when we compute the data for it.
            frequencyVector: [0,0,0],
        }
    }

    async upsertFilesIntoNodes(files: FileInformation[]): Promise<Node[]> {
        let insertedFileNodes = [];
        for (const file of files) {
            const parsedPath = this.parsePath(file?.path);
            let directories = parsedPath.slice(0, parsedPath.length - 1);
            const currentFileParentId = await this.checkExistingDirectoriesOrCreate(directories);
            const newNodeForCurrentFile = this.transformFileToNode(file, currentFileParentId);
            const newNode = await prisma.node.create({ data: newNodeForCurrentFile });
            insertedFileNodes.push(newNode);
        }
        return insertedFileNodes;
    }

    //We return the deepest directory parentId for it to be rattached to the currentFile.
    async checkExistingDirectoriesOrCreate(directories: string[]): Promise<string | null> {
        let currentParentId: string | null = null;
        for (const dirName of directories) {
            const node = await prisma.node.upsert({
                where: {
                    parentId_name: {
                        parentId: currentParentId ?? "00000000-0000-0000-0000-000000000000",
                        name: dirName
                    }
                },
                update: {},
                create: {
                    name: dirName,
                    type: FileEnum.DIRECTORY,
                    parentId: currentParentId
                }
            });
            currentParentId = node.id;
        }
        return currentParentId;
    }
}
