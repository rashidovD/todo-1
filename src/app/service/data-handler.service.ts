import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryDAOArray } from '../data/dao/impl/CategoryDAOArray';
import { TaskDAOArray } from '../data/dao/impl/TaskDAOArray';
import { TestData } from '../data/TestData';
import { Category } from '../model/Category';
import { Priority } from '../model/Priority';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root',
})
export class DataHandlerService {
  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray();

  constructor() {}

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }


  fillCategories(): Category[] {
    return TestData.categories;
  }

  searchTasks(
    category: Category,
    searchText: string,
    status: boolean,
    priority: Priority
  ): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }
}
