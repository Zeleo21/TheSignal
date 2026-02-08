

export type File = {
  name: string;
  size: number;
  type: string;
  path: string;
}



export type FileNode = {
  id: string;
  name: string;
  type: 'FILE' | 'DIRECTORY';
  parentId?: string;
  children?: FileNode[];
  metadata?: any;
}
