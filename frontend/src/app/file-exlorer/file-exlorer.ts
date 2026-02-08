import {Component, computed, input, signal} from '@angular/core';
import { FileNode } from '../service/file/file.model';
import {FileFormatPipe} from '../pipe/file-format-pipe';
import {FileEnum} from '../../constants/fileEnum';

@Component({
  selector: 'app-file-exlorer',
  imports: [
    FileFormatPipe
  ],
  templateUrl: './file-exlorer.html',
})
export class FileExlorer {

  public node = input<FileNode>();
  public depth = input<number>(0);
  public isOpen = signal(false);


  get isDirectory(): boolean {
    return !!(this.node()?.type === 'DIRECTORY' || (this.node()?.children && !!this.node()?.children?.length));
  }

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  protected readonly FileEnum = FileEnum;
}
