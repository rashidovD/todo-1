import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EditTaskDialogComponent} from 'src/app/dialog/edit-task-dialog/edit-task-dialog.component';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from 'src/app/service/data-handler.service';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../model/Category';
import {Priority} from "../../model/Priority";
import {OperType} from "../../dialog/OperType";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = [
    'color',
    'id',
    'title',
    'date',
    'priority',
    'category',
    'operations',
    'select',
  ];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  tasks: Task[];
  priorities: Priority[]

  // текущие задачи для отображения на странице
  @Input('tasks') //напрямую  не присваиваем значения в tasks, только через @Input
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input()
  selectedCategory: Category

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  filterByTitle = new EventEmitter<Task>();

  @Output()
  addTask = new EventEmitter<Task>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();


  searchTaskText: any;
  selectedStatusFilter: any;
  selectedPriorityFilter: any;

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe((tasks) => (this.tasks = tasks));
    //
    this.dataSource = new MatTableDataSource();
    // this.fillTable(); // заполняем таблицу  данными (задачи) и метаданными
    this.onSelectedCategory(null)
  }

  getPriorityColor(task: Task) {
    if (task.completed) {
      return '#f8f9fa';
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';
  }

  private fillTable() {
    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks;
    this.addTableObjects();

    // @ts-ignore
    this.dataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openEditTaskDialog(task: Task): void {
    // this.updateTask.emit(task);

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи', OperType.ADD],
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'complete') {
        task.completed = true; // ставим статус задачи как выполненная
        this.updateTask.emit(task);
      }

      if (result === 'activate') {
        task.completed = false; // ставим статус задачи как выполненная
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие!',
        message: `Вы действительно хотите удалить задачу: "${task.title}"`,
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  onToggleStatus(task: Task): void {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  onSelectedCategory(category: Category) {
    this.selectCategory.emit(category);
  }

  onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText)
  }

  onFilterByStatus(value: boolean) {
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  onFilterByPriority(value: Priority) {
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  openAddTaskDialog() {
    const task = new Task(null, '', false, null, this.selectedCategory)

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Добавление задачи', OperType.ADD],
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTask.emit(task)
      }
    })
  }
}
