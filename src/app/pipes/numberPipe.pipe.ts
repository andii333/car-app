import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'number2' })
export class NumberPipe implements PipeTransform {
    transform(value: number): string {
      return value.toString().replace(/(\w+)(\w{3}$)/gi, '$1 $2')
    }
}