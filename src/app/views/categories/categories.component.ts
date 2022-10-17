import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) {}

  // метод вызывается автоматически после инициализации компонента
  ngOnInit(): void {
    // this.categories = this.dataHandler.fillCategories();
    this.dataHandler.categoriesSubject.subscribe((categories) => this.categories = categories)
  }

  showTasksByCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandler.fillTasksByCategory(category);
  }
}
