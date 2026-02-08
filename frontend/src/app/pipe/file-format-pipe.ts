import { Pipe, PipeTransform } from '@angular/core';

export const MAX_FILE_NAME_LENGTH = 20;

@Pipe({
  name: 'fileFormat',
})
export class FileFormatPipe implements PipeTransform {
  transform(name: string | undefined, isDirectory: boolean): string {
    if(!name) return '';
    if(isDirectory){
      return name.slice(0, MAX_FILE_NAME_LENGTH) + (name.length > MAX_FILE_NAME_LENGTH ? '...' : '');
    } else {
      const parsedName = name.split('.');
      const isOverMaxLengthWithExtension = parsedName[0]?.length > MAX_FILE_NAME_LENGTH - parsedName[1]?.length;
      return (parsedName[0]?.slice(0, MAX_FILE_NAME_LENGTH - (parsedName[1]?.length ?? 0))) + (isOverMaxLengthWithExtension ? '... ' : '') + '.' +  parsedName[1];
    }
  }

}
