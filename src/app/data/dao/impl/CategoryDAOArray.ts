import {Observable, of} from 'rxjs';
import { Category } from 'src/app/model/Category';
import { CategoryDAO } from './../interface/CategoryDAO';
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {
  search(title: string): Observable<Category[]> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<Category[]> {
    return of(TestData.categories)
  }
  get(id: number): Observable<Category> {
    throw new Error('Method not implemented.');
  }
  update(obj: Category): Observable<Category> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<Category> {
    throw new Error('Method not implemented.');
  }
  add(obj: Category): Observable<Category> {
    throw new Error('Method not implemented.');
  }

}
