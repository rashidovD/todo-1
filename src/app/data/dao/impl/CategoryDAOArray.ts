import {Observable, of} from 'rxjs';
import {Category} from 'src/app/model/Category';
import {CategoryDAO} from './../interface/CategoryDAO';
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {
  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(
      category => category.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.title.localeCompare(c2.title)))
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories)
  }

  get(id: number): Observable<Category> {
    throw new Error('Method not implemented.');
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === category.id)
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category)

    return of(tmpCategory)
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null
      }
    })

    const tmpCategory = TestData.categories.find(t => t.id === id)
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1)

    return of(tmpCategory)
  }

  add(category: Category): Observable<Category> {
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory()
    }

    TestData.categories.push(category);

    return of(category)
  }

  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(category => category.id)) + 1
  }

}
