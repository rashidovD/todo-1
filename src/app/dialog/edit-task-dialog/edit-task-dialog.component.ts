import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {OperType} from "../OperType";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent implements OnInit {
  private operType: OperType


  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {}

  public categories: Category[];
  public priorities: Priority[];

  public dialogTitle: string; // заголовок окна
  public task: Task; // задача для редактирования / создания

  // сохраняем все значения в отдельные переменные
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  public tmpTitle: string;
  public tmpCategory: Category;
  public tmpPriority: Priority;
  // public tmpDate: string | null;
  public tmpDate: Date | null;

  ngOnInit(): void {
    this.task = this.data[0]; // задача для редактирования / создания
    this.dialogTitle = this.data[1]; // текст для диалогого окна
    this.operType = this.data[2]

    // инициализация начальных значений
    // записываем в tmp чтобы можно было отменть изменения
    // а то будут сразу записываться в задачу
    this.tmpTitle = this.task.title;
    // @ts-ignore
    this.tmpCategory = this.task.category;
    // @ts-ignore
    this.tmpPriority = this.task.priority;
    // @ts-ignore
    this.tmpDate = this.task.date;

    this.dataHandler
      .getAllCategories()
      .subscribe((items) => (this.categories = items));
    this.dataHandler
      .getAllPriorities()
      .subscribe((items) => (this.priorities = items));
  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    // @ts-ignore
    this.task.date = this.tmpDate;
    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие!',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"`,
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  complete() {
    this.dialogRef.close('complete');
  }

  activate() {
    this.dialogRef.close('activate');
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT
  }

  canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT
  }
}
