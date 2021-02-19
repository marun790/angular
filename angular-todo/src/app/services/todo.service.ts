import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TODO } from '../models/TODO';

const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoURI: string = 'https://jsonplaceholder.typicode.com/todos';
  todo_limit:string = '?_limit=5';

  constructor(private http: HttpClient) {

  }

  toggleTaskCompleted(todo:TODO): Observable<any> {
    const url = `${this.todoURI}/${todo.id}`;
    return this.http.put(url, todo, headerOptions);
  }

  getTodos(): Observable<TODO[]> {
    return this.http.get<TODO[]>(`${this.todoURI}${this.todo_limit}`);
  }

  deleteToDo(todo: TODO):Observable<any> {
    return this.http.delete(`${this.todoURI}/${todo.id}`);
  }
}
