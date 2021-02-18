import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor() {

  }

  getTodos() {
    return [{
      id: 1,
      title: 'TODO 1',
      completed: false
    }, {
      id: 2,
      title: 'TODO two',
      completed: false
    },
    {
      id: 3,
      title: 'TODO three',
      completed: false
    }
    ]
  }
}
