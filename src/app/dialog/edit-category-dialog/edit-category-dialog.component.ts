import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OperType} from "../OperType";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {
  public dialogTitle: string;
  public categoryTitle: string;
  // public canDelete = true;

  private operType: OperType

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // для работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType], // данные переданные в диалог.окно!
    private dialog: MatDialog // для открытия нового диалог.окна из текущего!
  ) {
  }

  ngOnInit(): void {
    // Категория
    this.categoryTitle = this.data[0]
    // Заголовок диалогового окна 'Редактирование категории'
    this.dialogTitle = this.data[1]
    this.operType = this.data[2]

  }

  onConfirm() {
    this.dialogRef.close(this.categoryTitle)
  }

  onCancel() {
    this.dialogRef.close(false)
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие!',
        message: `Вы действительно хотите удалить задачу: "${this.categoryTitle}"`,
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT
  }
}
