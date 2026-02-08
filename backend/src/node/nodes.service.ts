import { Injectable } from '@nestjs/common';
import { FileInformation } from "./nodes.controller";
import { FileEnum } from "../constants/fileEnum";
import prisma from "../prisma/client";
import { Prisma, Node } from '@prisma/client';
import ROOT_NODE from "../prisma/constants";

@Injectable()
export class NodesService {

    private dirCache = new Map<string, string>();

    async checkVirtualRootNodeExistOrCreate(): Promise<void> {
        await prisma.node.upsert({
            where: { id: ROOT_NODE },
            update: {},
            create: {
                id: ROOT_NODE,
                name: "ROOT_VIRTUAL_NODE",
                type: FileEnum.DIRECTORY,
            }
        })
    }

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
        await this.checkVirtualRootNodeExistOrCreate();
        let rootDirectory = "";
        for (const file of files) {
            const parsedPath = this.parsePath(file?.path);
            let directories = parsedPath.slice(0, parsedPath.length - 1);
            console.log(directories[0]);
            const currentFileParentId = await this.checkExistingDirectoriesOrCreate(directories);
            const newNodeForCurrentFile = this.transformFileToNode(file, currentFileParentId);
            const newNode = await prisma.node.upsert({
                where: {
                    parentId_name: {
                        name: newNodeForCurrentFile.name,
                        parentId: newNodeForCurrentFile.parentId,
                    }
                },
                update: {},
                create: newNodeForCurrentFile,
            });
            // We add the root directory to return all root directories.
            rootDirectory = directories[0];
        }
        return this.getRootNodeOfUpsertedDirectories(rootDirectory);
    }

    //We return the deepest directory parentId for it to be rattached to the currentFile.
    async checkExistingDirectoriesOrCreate(directories: string[]): Promise<string | null> {
        let pathKey = "";
        let currentParentId: string | null = null;
        for (const dirName of directories) {
            pathKey += (pathKey ? '/' : '') + dirName;
            if(this.dirCache.has(pathKey)) {
                currentParentId = this.dirCache.get(pathKey)!;
                continue;
            }

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
                    parentId: currentParentId ?? "00000000-0000-0000-0000-000000000000"
                }
            });
            currentParentId = node.id;
            this.dirCache.set(pathKey, node.id);
        }
        return currentParentId;
    }

    async getRootNodeOfUpsertedDirectories(directory: string): Promise<Node[]> {
        if(!directory || directory.length === 0) return [];
        return prisma.node.findMany({
            where: {
                name: directory,
            }
        })
    }

    buildTree(nodes: Node[], rootId: string | null): any[] {
        const childrenMap = new Map<string | null, Node[]>();
        nodes.forEach(node => {
            const list = childrenMap.get(node.parentId) || [];
            list.push(node);
            childrenMap.set(node.parentId, list);
        });
        const helper = (id: string | null): any[] => {
            return (childrenMap.get(id) || []).map(node => ({
                ...node,
                children: helper(node.id)
            }));
        };
        return helper(rootId);
    }

    async getAllFilesAndDirectoriesFromRootNode(rootNodeId: string): Promise<Node[]> {
        const tree = await prisma.$queryRaw<Node[]>`
            WITH RECURSIVE tree AS (
            SELECT * FROM nodes WHERE id = ${rootNodeId}::uuid
            UNION ALL
            SELECT n.* FROM nodes n
            INNER JOIN tree t ON n.parent_id = t.id
        )
        SELECT 
            id,
            parent_id as "parentId",
            name,
            type,
            metadata,
            frequency_vector as "frequencyVector",
            created_at as "createdAt"
            FROM tree;
        `;
        console.log(tree);
        return this.buildTree(tree, tree[0].parentId);
    }

}
