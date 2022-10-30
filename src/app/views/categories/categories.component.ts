import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @Input()
  categories: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();

  selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) {}

  // метод вызывается автоматически после инициализации компонента
  ngOnInit(): void {
    // this.categories = this.dataHandler.fillCategories();
    // this.dataHandler.getAllCategories().subscribe(
    //   (categories) => (this.categories = categories)
    // );
  }

  showTasksByCategory(category: Category) {
    // this.selectedCategory = category;
    // this.dataHandler.fillTasksByCategory(category);

    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category; // сохраняем выбранную категорию

    // вызываем внешний обработчик и передаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory);
  }
}
