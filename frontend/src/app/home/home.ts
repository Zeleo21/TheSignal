import {Component, computed, effect, inject, signal} from '@angular/core';
import { FileService } from '../service/file/file.service';
import { File } from '../service/file/file.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  private readonly fileService = inject(FileService);
  public areFileUploaded = signal(false);
  public folderList = signal<File | null>(null);
  public rootId = signal('');

  constructor() {
    effect(async () => {
      const id = this.rootId();
      if (id) {
        const tree = await this.fileService.getAllFilesFromRootNode(id);
        this.folderList.set(tree);
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
