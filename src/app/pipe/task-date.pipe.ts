import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'taskDate',
})
export class TaskDatePipe extends DatePipe implements PipeTransform {
  //@ts-ignore
  transform(date: Date | string, format: string = 'mediumDate'): string {
    if (date == null) {
      return 'Без срока';
    }

    date = new Date(date);

    const currentDate = new Date().getDate()

    if (date.getDate() === currentDate) {
      return 'Сегодня';
    }

    if (date.getDate() === currentDate - 1) {
      return 'Вчера';
    }

    if (date.getDate() === currentDate + 1) {
      return 'Завтра';
    }
    //@ts-ignore
    return new DatePipe('ru-RU').transform(date, format);
  }
}
