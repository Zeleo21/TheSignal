import { Injectable } from '@angular/core';
import { File } from './file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  extractFileInformation(files: FileList): File[] {
    let fileInformation: File[] = [];
    for(const file of files) {
      fileInformation.push({name: file.name, size: file.size, type: file.type })
    }
    return fileInformation;
  }

  uploadFiles(files: FileList): void {
    if(!files || files.length === 0) {
      return;
    }
    let fileInformation = this.extractFileInformation(files);
    console.log(fileInformation);
  }
}




