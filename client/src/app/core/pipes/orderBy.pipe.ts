import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderByPipe'
})
export class OrderByPipe implements PipeTransform {

  transform(array: Array<string>, arg: string): Array<string> {

    if (!array || array === undefined || array.length === 0) return null;

    switch (arg) {
      case 'datetime':
        array.sort((a: any, b: any) => {
          return (new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
        });
        break;
    }

    return array;

  }

}
