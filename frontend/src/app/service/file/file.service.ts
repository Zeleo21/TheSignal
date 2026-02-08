import { Injectable } from '@angular/core';
import { File, FileNode } from './file.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  extractFileInformation(files: FileList): File[] {
    let fileInformation: File[] = [];
    const actualFiles = Array.from(files);
    for(const file of actualFiles) {
      fileInformation.push({ name: file.name, size: file.size, type: file.type, path: file.webkitRelativePath })
    }
    return fileInformation;
  }

  async uploadFiles(files: FileList): Promise<string> {
    if (!files || files.length === 0) {
      return '';
    }
    let fileInformation = this.extractFileInformation(files);
    console.log(fileInformation);
    try {
      //FIXME : use .env and everything later on for cleeeean code
      //FIXME : also move this into an api service for better reusability
      const res = await axios.post("http://localhost:3300/nodes/upload", fileInformation)
      return res?.data[0]?.id;
      // const rootFolder = await axios.get(`http://localhost:3300/nodes/tree/${res.data[0]?.id}`, res)
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  //FIXME for better display :)
  async getAllFilesFromRootNode(nodeId: string): Promise<FileNode> {
    const tree = await axios.get(`http://localhost:3300/nodes/tree/${nodeId}`);
    console.log(tree.data[0])
    return tree.data[0];
  }
}




