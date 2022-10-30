import { Component, OnInit } from '@angular/core';
import { Category } from './model/Category';
import { Task } from './model/Task';
import { DataHandlerService } from './service/data-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todo';
  tasks: Task[];
  categories: Category[];
  //@ts-ignore
  private selectedCategory: Category = null;

  constructor(private dataHandler: DataHandlerService) {} // Фасад для работы с данными

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe((tasks) => (this.tasks = tasks));
    this.dataHandler
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
    //@ts-ignore
    this.onSelectCategory(null); // показать все задачи
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;

    this.dataHandler
      // @ts-ignore
      .searchTasks(this.selectedCategory, null, null, null)
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  onUpdateTask(task: Task) {
    console.log(task);
  }
}
