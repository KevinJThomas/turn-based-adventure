import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'twodigit' })
export class TwoDigitPipe implements PipeTransform {
    transform(value: string): string {
        if (value.toString().length <= 1) {
            return '0' + value;
        } else {
            return value;
        }
    }
}
