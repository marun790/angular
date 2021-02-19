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

  constructor(private toDoService: TodoService) {
  }

  ngOnInit(): void {
    this.toDoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteToDo(todo: TODO) {
    this.todos = this.todos.filter(todoArg => todoArg.id != todo.id);
    this.toDoService.deleteToDo(todo).subscribe(todo => {
      console.log(todo)
    });
  }

}
