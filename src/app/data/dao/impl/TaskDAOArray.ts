import {TestData} from './../../TestData';
import {Observable, of} from 'rxjs';
import {Category} from 'src/app/model/Category';
import {Priority} from 'src/app/model/Priority';
import {Task} from 'src/app/model/Task';
import {TaskDAO} from './../interface/TaskDAO';

export class TaskDAOArray implements TaskDAO {
  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task> {
    // @ts-ignore
    // return of(TestData.tasks.find((todo) => todo.id === id));
    return undefined;
  }

  search(
    category: Category,
    searchText: string,
    status: boolean,
    priority: Priority
  ): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  private searchTasks(
    category: Category,
    searchText: string,
    status: boolean,
    priority: Priority
  ): Task[] {
    let allTasks = TestData.tasks;

    if (status != null) {
      allTasks = allTasks.filter((todo) => todo.completed === status);
    }

    if (category != null) {
      allTasks = allTasks.filter((todo) => todo.category === category);
    }

    if (priority != null) {
      allTasks = allTasks.filter((todo) => todo.priority === priority);
    }

    if (searchText != null) {
      allTasks = allTasks.filter((todo) => todo.title.toUpperCase().includes(searchText.toUpperCase()));
    }

    return allTasks; // отфильтрованный массив
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    throw new Error('Method not implemented.');
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    throw new Error('Method not implemented.');
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    throw new Error('Method not implemented.');
  }

  getTotalCount(): Observable<number> {
    throw new Error('Method not implemented.');
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find((t) => t.id === task.id);
    // @ts-ignore
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);

    return of(task);
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === id)
    // @ts-ignore
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1)
    // @ts-ignore
    return of(taskTmp)
  }

  add(task: Task): Observable<Task> {
    // если id пустой то генерим его
    if (task.id === null || task.id === 0) {
      task.id = this.getLastIdTask()
    }
    TestData.tasks.push(task)
    return of(task)
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1
  }
}
