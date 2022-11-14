import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from 'src/app/model/Category';
import {DataHandlerService} from 'src/app/service/data-handler.service';
import {MatDialog} from '@angular/material/dialog';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperType} from "../../dialog/OperType";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @Input()
  categories: Category[];

  @Input()
  selectedCategory: Category;

  // Выбрали категорию из списка
  @Output()
  selectCategory = new EventEmitter<Category>();

  // Удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>();

  // Изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<string>();

  @Output()
  searchCategory  = new EventEmitter<string>();

  indexMouseMove: number;
  searchCategoryTitle: string;


  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  // метод вызывается автоматически после инициализации компонента
  ngOnInit(): void {
  }

  showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category; // сохраняем выбранную категорию

    // вызываем внешний обработчик и передаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory);
  }

  // сохраняет индекс записи категории, над которой в данный момент проходит мышка - и отображается icon
  showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  // dialog popup для редактирования категории
  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории', OperType.EDIT],
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }

      if (typeof (result) === 'string') {
        category.title = result as string;

        this.updateCategory.emit(category)
        return;
      }
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Добавление категории', OperType.ADD],
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(<string>result)
      }
    })
  }


  // Поиск категории
  search() {
    if (this.searchCategoryTitle == null) {
      return
    }

    this.searchCategory.emit(this.searchCategoryTitle)
  }
}
