import { Component, OnInit } from '@angular/core';
import { TODO } from '../../models/TODO'
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: TODO[];

  constructor(private toDoService : TodoService) {
  }
  
  ngOnInit(): void {
    this.todos = this.toDoService.getTodos();
  }

}
