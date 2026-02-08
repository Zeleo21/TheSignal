import {Component, input} from '@angular/core';
import {FileNode} from '../service/file/file.model';
import {FileExlorer} from '../file-exlorer/file-exlorer';

@Component({
  selector: 'app-file-container',
  imports: [
    FileExlorer
  ],
  templateUrl: './file-container.html',
})
export class FileContainer {
  public node = input<FileNode>();
}
