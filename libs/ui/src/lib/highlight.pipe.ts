import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if (!args) { return value; }
    //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    const re = new RegExp(args[0], 'gi');
    return value.replace(re, "<b>$&</b>");
  }

}
