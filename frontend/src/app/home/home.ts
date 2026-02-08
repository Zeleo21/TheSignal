import {Component, computed, effect, inject, signal} from '@angular/core';
import { FileService } from '../service/file/file.service';
import { File, FileNode} from '../service/file/file.model';
import { FileExlorer } from '../file-exlorer/file-exlorer';
import {FileContainer} from '../file-container/file-container';

@Component({
  selector: 'app-home',
  imports: [
    FileExlorer,
    FileContainer
  ],
  templateUrl: './home.html',
  standalone: true
})
export class Home {
  private readonly fileService = inject(FileService);
  public areFileUploaded = signal(false);
  public fileSystem = signal<FileNode | undefined>(undefined);
  public rootId = signal('');

  constructor() {
    effect(async () => {
      const id = this.rootId();
      if (id) {
        const tree = await this.fileService.getAllFilesFromRootNode(id);
        this.fileSystem.set(tree);
      }
    }, { allowSignalWrites: true });
  }

  public onFileSelected = async (event: any): Promise<void> => {
    const files: FileList = event.target.files;
    const newRootId = (await this.fileService.uploadFiles(files));
    this.rootId.set(newRootId);

    this.areFileUploaded.set(true);
  }
}
