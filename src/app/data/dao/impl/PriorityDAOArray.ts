import { Observable, of } from 'rxjs';
import { Priority } from 'src/app/model/Priority';
import { TestData } from '../../TestData';
import { PriorityDAO } from './../interface/PriorityDAO';

export class PriorityDAOArray implements PriorityDAO {
  getAll(): Observable<Priority[]> {
    return of(TestData.priorities)
  }
  get(id: number): Observable<Priority> {
    throw new Error('Method not implemented.');
  }
  update(obj: Priority): Observable<Priority> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<Priority> {
    throw new Error('Method not implemented.');
  }
  add(obj: Priority): Observable<Priority> {
    throw new Error('Method not implemented.');
  }

}
