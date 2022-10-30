import { CommonDAO } from './CommonDAO';
import { Category } from 'src/app/model/Category';
import { Observable } from 'rxjs';

export interface CategoryDAO extends CommonDAO<Category> {
  search(title: string): Observable<Category[]>;
}
