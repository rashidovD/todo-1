import {Component, OnInit} from '@angular/core';
import {Category} from './model/Category';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Priority} from "./model/Priority";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todo';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[]
  //@ts-ignore
  public selectedCategory: Category = null;

  // filtration
  public statusFilter: boolean;
  public priorityFilter: Priority;
  // Search
  public searchTaskText = '';
  private searchCategoryText: string;


  constructor(private dataHandler: DataHandlerService) {
  } // Фасад для работы с данными

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe((tasks) => (this.tasks = tasks));
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    //@ts-ignore
    this.onSelectCategory(null); // показать все задачи
  }

  public onSelectCategory(category: Category) {
    this.selectedCategory = category;

    // this.dataHandler
    //   // @ts-ignore
    //   .searchTasks(this.selectedCategory, null, null, null)
    //   .subscribe(tasks => {
    //     this.tasks = tasks;
    //   });
    this.updateTask()
  }

  public onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler
        // @ts-ignore
        .searchTasks(this.selectedCategory, null, null, null)
        .subscribe((tasks) => {
          this.tasks = tasks;
        });
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler
        // @ts-ignore
        .searchTasks(this.selectedCategory, null, null, null)
        .subscribe((task) => (this.tasks = task));
    });
  }

  // Удаление категории
  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe((category) => {
      this.selectedCategory = null; // Открываем категорию "Все"
      this.onSelectCategory(null)
    })
  }

  // обновление категории
  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText)
    })
  }

  // поиск задач
  onSearchTasks(searchString: any) {
    this.searchTaskText = searchString;
    this.updateTask();
  }

  // фильтрация задач по статусу
  onFilterTasksByStatus(status: any) {
    this.statusFilter = status;
    this.updateTask()
  }

  onFilterTasksByPriority(priority: Priority) {
    // console.log(v)
    this.priorityFilter = priority;
    this.updateTask();
  }

  // Добавление задачи
  onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(() => {
      this.updateTask()
    })
  }

  onAddCategory(title: string) {
    console.log(title)
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategories())
  }

  private updateCategories() {
      this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
  }

  private updateTask() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    })
  }


  //поиск категории
  onSearchCategory(title: string) {
    this.searchCategoryText = title

    this.dataHandler.searchCategories(title).subscribe((categories) => {
      this.categories = categories
    })
  }
}
