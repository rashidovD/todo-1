import { Injectable } from '@angular/core';
import { TestData } from '../data/TestData';
import { Category } from '../model/Category';
import { Task } from '../model/Task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataHandlerService {
  constructor() {}

  tasksSubject = new Subject<Task[]>();

  getCategories(): Category[] {
    return TestData.categories;
  }

  fillTasks() {
    this.tasksSubject.next(TestData.tasks);
  }

  fillTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter((task) => task.category === category);
    this.tasksSubject.next(tasks);

    // console.log(tasks);
  }
}
