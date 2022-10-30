import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task-dialog/edit-task-dialog.component';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';

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
  ];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;

  // текущие задачи для отображения на странице
  @Input('tasks') //напрямую  не присваиваем значения в tasks, только через @Input
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();
  tasks: Task[];

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe((tasks) => (this.tasks = tasks));
    //
    this.dataSource = new MatTableDataSource();
    this.fillTable(); // заполняем таблицу  данными (задачи) и метаданными
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
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

  private addTableObjects() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openEditTaskDialog(task: Task) {
    // this.updateTask.emit(task);

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи'],
      autoFocus: false,
      width: '252px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //
    });
  }
}
