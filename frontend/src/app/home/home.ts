import {Component, inject, signal} from '@angular/core';
import { FileService } from '../service/file/file.service';

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

  public onFileSelected = async (event: any): Promise<void> => {
    const files: FileList = event.target.files;
    await this.fileService.uploadFiles(files);
    this.areFileUploaded.set(true);
  }
}
